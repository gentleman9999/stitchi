import { getOrThrow } from '../utils'
import sendgridClient from '@sendgrid/client'
import * as yup from 'yup'
import * as uuid from 'uuid'
import { logger } from '../telemetry'

const SKIP_MARKETING_EMAILS = getOrThrow(
  process.env.SENDGRID_SKIP_MARKETING_EMAILS,
  'SENDGRID_SKIP_MARKETING_EMAILS',
)

const SENDGRID_NEW_USER_MAILING_LIST_ID = getOrThrow(
  process.env.SENDGRID_NEW_USER_MAILING_LIST_ID,
  'SENDGRID_NEW_USER_MAILING_LIST_ID',
)

const SENDGRID_NEWSLETTER_SUBSCRIBER_MAILING_LIST_ID = getOrThrow(
  process.env.SENDGRID_NEWSLETTER_SUBSCRIBER_MAILING_LIST_ID,
  'SENDGRID_NEWSLETTER_SUBSCRIBER_MAILING_LIST_ID',
)

const SENDGRID_STUDENT_MERCH_DOWNLOAD_MAILING_LIST_ID = getOrThrow(
  process.env.SENDGRID_STUDENT_MERCH_DOWNLOAD_MAILING_LIST_ID,
  'SENDGRID_STUDENT_MERCH_DOWNLOAD_MAILING_LIST_ID',
)

export enum SendgridMarketingEmailList {
  NEW_USER = 'NEW_USER',
  NEWSLETTER_SUBSCRIBER = 'NEWSLETTER_SUBSCRIBER',
  STUDENT_MERCH_DOWNLOAD = 'STUDENT_MERCH_DOWNLOAD',
}

const personalizationSchema = yup
  .array()
  .of(
    yup
      .object()
      .shape({
        to: yup
          .array()
          .of(
            yup.object().shape({
              email: yup.string().email().required(),
              name: yup.string().optional(),
            }),
          )
          .min(1)
          .required(),
      })
      .required(),
  )
  .min(1)
  .required()

const messageSchema = yup.object().shape({
  subject: yup.string().required(),
  // Unix timestamp
  sendAt: yup.number().optional(),
  from: yup.object().shape({
    email: yup.string().email().required(),
    name: yup.string().optional(),
  }),
  replyTo: yup
    .object()
    .shape({
      email: yup.string().email().optional(),
      name: yup.string().optional(),
    })
    .optional(),
  content: yup
    .array()
    .of(
      yup.object().shape({
        type: yup.string().oneOf(['text/plain', 'text/html']).required(),
        value: yup.string().required(),
      }),
    )
    .required(),
  personalizations: personalizationSchema,
})

const contactSchema = yup.object().shape({
  email: yup.string().email().required(),
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  customFields: yup
    .object()
    .shape({
      userId: yup.string().optional(),
      membershipId: yup.string().optional(),
      organizationId: yup.string().optional(),
      organizationName: yup.string().optional(),
    })
    .optional(),
})

const sendgridApiKey = getOrThrow(
  process.env.SENDGRID_API_KEY,
  'SENDGRID_API_KEY',
)

sendgridClient.setApiKey(sendgridApiKey)

interface AddMarketingContactsInput {
  lists: SendgridMarketingEmailList[]
  contacts: yup.InferType<typeof contactSchema>[]
}

interface SendTransactionalEmailInput {
  message: yup.InferType<typeof messageSchema>
}

export interface SendgridClient {
  sendTransactionalEmail: (input: SendTransactionalEmailInput) => Promise<void>
  addMarketingContacts: (input: AddMarketingContactsInput) => Promise<void>
}

const makeClient = (
  { sendgrid }: { sendgrid: typeof sendgridClient } = {
    sendgrid: sendgridClient,
  },
): SendgridClient => {
  return {
    sendTransactionalEmail: async input => {
      const message = messageSchema.validateSync(input.message)

      try {
        await sendgrid.request(
          {
            url: `/v3/mail/send`,
            method: 'POST',

            body: JSON.stringify({
              personalizations: message.personalizations.map(
                personalization => ({
                  to: personalization.to.map(to => ({
                    email: to.email,
                    name: to.name,
                  })),
                  headers: {
                    // Ensure emails w/ same subject are not grouped together
                    // https://github.com/nodemailer/nodemailer/issues/1248#issuecomment-781484713
                    'X-Entity-Ref-ID': uuid.v4(),
                  },
                }),
              ),
              from: {
                email: message.from.email,
                name: message.from.name,
              },
              reply_to: message.replyTo
                ? {
                    email: message.replyTo.email,
                    name: message.replyTo.name,
                  }
                : undefined,
              content: message.content,
              send_at: message.sendAt,
              subject: message.subject,
            }),
          },
          (error, response) => {
            if (error) {
              logger
                .child({
                  context: { error },
                })
                .error('Error sending email to SendGrid')
              return
            } else {
              return response
            }
          },
        )
      } catch (error) {
        console.error('Failed to send Sendgrid transactional email', {
          context: { error, input },
        })

        throw new Error('Failed to send Sendgrid transactional email')
      }
    },
    addMarketingContacts: async input => {
      const contacts = input.contacts.map(contact => {
        try {
          return contactSchema.validateSync(contact)
        } catch (error) {
          logger.error(error)
          throw new Error('Invalid input')
        }
      })

      if (SKIP_MARKETING_EMAILS === 'true') {
        logger.info('Skipping marketing emails')
        return
      }

      const [response] = await sendgrid.request({
        url: `/v3/marketing/contacts`,
        method: 'PUT',
        body: JSON.stringify({
          list_ids: input.lists.map(listEnumToId),
          contacts: contacts.map(contact => ({
            email: contact.email,
            first_name: contact.firstName,
            last_name: contact.lastName,
            custom_fields: {
              user_id: contact.customFields?.userId,
              membership_id: contact.customFields?.membershipId,
              organization_id: contact.customFields?.organizationId,
              organization_name: contact.customFields?.organizationName,
            },
          })),
        }),
      })

      if (response.statusCode !== 202) {
        logger
          .child({
            context: { response },
          })
          .error(`Error sending contact form response to SendGrid`)

        throw new Error(`Error sending contact form response to SendGrid`)
      }
    },
  }
}

const listEnumToId = (list: SendgridMarketingEmailList) => {
  switch (list) {
    case SendgridMarketingEmailList.NEW_USER:
      return SENDGRID_NEW_USER_MAILING_LIST_ID
    case SendgridMarketingEmailList.NEWSLETTER_SUBSCRIBER:
      return SENDGRID_NEWSLETTER_SUBSCRIBER_MAILING_LIST_ID
    case SendgridMarketingEmailList.STUDENT_MERCH_DOWNLOAD:
      return SENDGRID_STUDENT_MERCH_DOWNLOAD_MAILING_LIST_ID
    default:
      throw new Error(`Invalid list: ${list}`)
  }
}

export { makeClient }
