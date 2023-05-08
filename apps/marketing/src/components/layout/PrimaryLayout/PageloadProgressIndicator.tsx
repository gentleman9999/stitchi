import dynamic from 'next/dynamic'
import React from 'react'
import { theme } from '../../../../tailwind.config'

const PageLoadProgress = dynamic(() => import('nextjs-progressbar'), {
  ssr: false,
})

const PageloadProgressIndicator = () => {
  return (
    <PageLoadProgress
      color={theme.colors.primary}
      options={{ showSpinner: false }}
    />
  )
}

export default PageloadProgressIndicator
