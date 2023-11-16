import React from 'react'
import DesignLibraryPage from './DesignLibraryPage'
import routes from '@lib/routes'

const title = 'Browse custom merch design inspiration'
const description =
  'Get inspired by our library of custom shirt designs or work directly with a designer to bring your vision to life (for free).'

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: routes.internal.lookbook.href(),
  },
}

const Page = () => {
  return <DesignLibraryPage />
}

export default Page
