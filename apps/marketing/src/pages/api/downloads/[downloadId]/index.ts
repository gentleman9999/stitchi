import getOrThrow from '@utils/get-or-throw'
import { google } from 'googleapis'
import { NextApiHandler } from 'next'
import * as yup from 'yup'

// Load the Service Account credentials from the JSON key file
const credentials = getOrThrow(
  process.env.GOOGLE_APPLICATION_CREDENTIALS,
  'GOOGLE_APPLICATION_CREDENTIALS',
)

const pdfId = getOrThrow(
  process.env.CASH_IN_ON_MERCH_EBOOK_ID,
  'CASH_IN_ON_MERCH_EBOOK_ID',
)

const formInputSchema = yup
  .object({
    email: yup.string().email().required(),
  })
  .label('Form input')

const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case 'POST': {
        const formInput = await formInputSchema.validate(req.body)

        const downloadId = req.query.downloadId

        switch (downloadId) {
          case 'student-business-ebook': {
            console.info(`Sending student-business-ebook download`)

            try {
              const decodedCredentials = Buffer.from(
                credentials,
                'base64',
              ).toString('utf-8')

              const key = JSON.parse(decodedCredentials)

              // Initialize the Google Drive API client
              const auth = new google.auth.JWT(
                key.client_email,
                undefined,
                key.private_key,
                ['https://www.googleapis.com/auth/drive.readonly'],
                undefined,
              )

              const drive = google.drive({ version: 'v3', auth })

              // Fetch the PDF file metadata
              const { data } = await drive.files.get(
                { fileId: pdfId, alt: 'media' },
                { responseType: 'arraybuffer' },
              )

              // Set response headers and send the PDF file
              res.setHeader('Content-Type', 'application/pdf')
              res.setHeader(
                'Content-Disposition',
                'attachment; filename=downloaded-pdf.pdf',
              )
              res.status(200).send(data)
            } catch (error) {
              console.error('Error downloading PDF from Google Drive:', error)
              res
                .status(500)
                .send('An error occurred while downloading the PDF.')
            }

            break
          }

          default:
            throw new Error(`Invalid download id ${downloadId}`)
        }
      }

      default:
        throw new Error(`Unsupported method "${req.method}"`)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error })
  }
}

export default handler
