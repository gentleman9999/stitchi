import { User } from 'auth0'
import { logger } from '../../../telemetry'
import { getOrThrow } from '../../../utils'
import { DesignFactoryDesignRequest } from '../../design/factory'
import { OrderFactoryOrder } from '../../order/factory'
import { OrganizationRecord } from '../../organization/db/organization-table'

import { render } from '@react-email/render'
import DesignRequestUserCreatedTemplate from '../../../../../email-template-composer/emails/design-request-user-created'
import { MembershipFactoryMembership } from '../../membership/factory/membership'

const appBaseUrl = getOrThrow(
  process.env.STITCHI_MARKETING_APPLICATION_HOST,
  'STITCHI_MARKETING_APPLICATION_HOST',
)

const companyName = getOrThrow(process.env.COMPANY_NAME, 'COMPANY_NAME')

interface Notification {
  email: {
    subject: string
    htmlBody: string
    textBody: string
  } | null
  web: {
    message: string
    ctaText: string | null
    ctaUrl: string | null
  } | null
}

const notifications = {
  'order:confirmed': (params: {
    order: OrderFactoryOrder
    recipient: User
  }): Notification => {
    return {
      email: {
        subject: `Order #${params.order.humanReadableId} confirmed`,
        htmlBody: `Your order #${params.order.humanReadableId} is confirmed.`,
        textBody: `Your order #${params.order.humanReadableId} is confirmed.`,
      },
      web: {
        message: `Your order #${params.order.humanReadableId} is confirmed.`,
        ctaText: 'View',
        ctaUrl: `${appBaseUrl}/orders/${params.order.id}`,
      },
    }
  },

  'designRequest:submitted': (params: {
    designRequest: DesignFactoryDesignRequest
    designRequester: User
    recipient: User
  }): Notification => {
    const template = DesignRequestUserCreatedTemplate({
      // the email template reads "Hi <name>,"
      recipient: { name: params.recipient.name || 'there' },
      designRequest: {
        id: params.designRequest.id,
        name: params.designRequest.name,
        // TODO(custompro98): name and email aren't required, this ends up showing up as empty
        creatorName:
          params.designRequester.name || params.designRequester.email || '',
        submittedAt: params.designRequest.createdAt.toISOString(),
        expectedCompletionTime: null,
      },
      previewText: `Your design request ${params.designRequest.name} has been submitted and will be reviewed by an artist shortly.`,
      children: null,
    })

    return {
      email: {
        subject: `Design request submitted`,
        htmlBody: render(template),
        textBody: render(template, { plainText: true }),
      },
      web: {
        message: `Your design request ${params.designRequest.name} has been submitted and will be reviewed by an artist shortly.`,
        ctaText: 'View',
        ctaUrl: `${appBaseUrl}/closet/designs/${params.designRequest.id}`,
      },
    }
  },

  'designRequestProof:created': (params: {
    designRequest: DesignFactoryDesignRequest
    recipient: User
  }): Notification => {
    return {
      email: {
        subject: 'A design proof was submitted!',
        htmlBody: `A design proof was submitted for your design request ${params.designRequest.name}.`,
        textBody: `A design proof was submitted for your design request ${params.designRequest.name}.`,
      },
      web: {
        message: `A design proof was submitted for your design request ${params.designRequest.name}.`,
        ctaText: 'View',
        ctaUrl: `${appBaseUrl}/closet/designs/${params.designRequest.id}`,
      },
    }
  },

  'membership:invited': (params: {
    invitingUser: User
    membership: MembershipFactoryMembership
    organization: OrganizationRecord
  }): Notification => {
    logger.child({ context: { params } }).info('Sending')
    return {
      email: {
        subject: `${params.invitingUser.name} invited you to join ${params.organization.name} on ${companyName}`,
        htmlBody: `${params.invitingUser.name} invited you to join ${params.organization.name} on ${companyName}. Click <a href="${appBaseUrl}/invites/${params.membership.id}/accept">here</a> to accept the invitation.`,
        textBody: `${params.invitingUser.name} invited you to join ${params.organization.name} on ${companyName}. Click ${appBaseUrl}/invites/${params.membership.id}/accept to accept the invitation.`,
      },
      web: null,
    }
  },
}

export { notifications }
