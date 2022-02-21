import { NextApiHandler } from 'next'
import { object, string } from 'yup'
import sendgrid from '@sendgrid/client'
import getOrThrow from '@utils/get-or-throw'

const sendgridApiKey = getOrThrow(
  process.env.SENDGRID_API_KEY,
  'SENDGRID_API_KEY',
)

sendgrid.setApiKey(sendgridApiKey)

const formInputSchema = object({
  email: string().email().required(),
})

const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case 'POST':
        const formInput = await formInputSchema.validate(req.body)

        const data = {
          contacts: [
            {
              email: formInput.email,
            },
          ],
        }

        console.info('Starting to send form response to SendGrid')

        const [response] = await sendgrid.request({
          url: `/v3/marketing/contacts`,
          method: 'PUT',
          body: data,
        })

        if (response.statusCode !== 202) {
          console.error(`Error sending contact form response to SendGrid`, {
            context: { response },
          })

          throw new Error(`Error sending contact form response to SendGrid`)
        }

        console.info('Successfully sent form response to SendGrid')

        res.status(200).json(formInput)

        break
      default:
        throw new Error(`Unsupported method "${req.method}"`)
    }
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: e })
  }
}

export default handler
