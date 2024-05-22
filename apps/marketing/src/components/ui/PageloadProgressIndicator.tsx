import React from 'react'
import { theme } from '../../../tailwind.config'
import NextTopLoader from 'nextjs-toploader'

const PageloadProgressIndicator = () => {
  return <NextTopLoader color={theme.colors.primary} showSpinner={false} />
}

export default PageloadProgressIndicator
