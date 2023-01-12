'use client'

import PageLoadProgress from 'nextjs-progressbar'
import React from 'react'
import { theme } from '../../../../tailwind.config'

const PageloadProgressIndicator = () => {
  return (
    <PageLoadProgress
      color={theme.colors.primary}
      options={{ showSpinner: false }}
    />
  )
}

export default PageloadProgressIndicator
