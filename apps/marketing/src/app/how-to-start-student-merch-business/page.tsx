import routes from '@lib/routes'
import { Metadata } from 'next'
import GuideShowPage from './GuideShowPage'

export const metadata: Metadata = {
  title: 'How to start a merch business',
  description:
    'A book that teaches you how to build a profitable merch business as a college student.',
  openGraph: { url: routes.internal.ebooks.studentMerchBusiness.href() },
}

const Page = () => {
  return <GuideShowPage />
}

export default Page
