import GuideShowPage from '@components/pages/GuideShowPage'
import getOrThrow from '@utils/get-or-throw'
import { GoogleAuth } from 'google-auth-library'
import { docs_v1, google } from 'googleapis'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

const credentialsString = getOrThrow(
  process.env.GOOGLE_APPLICATION_CREDENTIALS,
  'GOOGLE_APPLICATION_CREDENTIALS',
)

const DOCUMENT_ID = '1szYwK9wmPWDlm3CtVUID1zr16X0jF2r7LHxyVniz7L0'

async function getGoogleDoc(documentId: string) {
  const credentials = JSON.parse(
    Buffer.from(credentialsString, 'base64').toString('utf-8'),
  )

  const auth = new GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/documents.readonly'],
  })

  const client = await auth.getClient()
  const docs = google.docs({ version: 'v1', auth: client })
  const response = await docs.documents.get({ documentId })
  return response.data
}

async function getHeadings(doc: docs_v1.Schema$Document) {
  const toc = doc.body?.content?.filter(c => Boolean(c.tableOfContents))[0]
    .tableOfContents

  console.log('TOC', toc?.content)

  const elements = doc.body?.content?.filter(
    c =>
      c.paragraph?.paragraphStyle?.namedStyleType === 'HEADING_1' ||
      c.paragraph?.paragraphStyle?.namedStyleType === 'HEADING_2',
  )

  const elements2 = elements?.map(e =>
    e.paragraph?.elements?.[0].textRun?.content?.replaceAll('\n', ''),
  )

  // console.log(elements2)
}

const getStaticProps: InferGetStaticPropsType<typeof Page> = async () => {
  const doc = await getGoogleDoc(DOCUMENT_ID)

  getHeadings(doc)

  return { props: { doc } }
}

const Page = ({ doc }: { doc: docs_v1.Schema$Document }) => {
  getHeadings(doc)
  return <GuideShowPage />
}

export default Page
export { getStaticProps }
