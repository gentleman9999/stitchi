import dynamic from 'next/dynamic'
import React from 'react'
import { theme } from '../../../tailwind.config'

const NextTopLoader = dynamic(() => import('nextjs-toploader'), {
  ssr: false,
})

const PageloadProgressIndicator = () => {
  return <NextTopLoader color={theme.colors.primary} showSpinner={false} />
}

export default PageloadProgressIndicator
