import { FocusedLayout } from '@components/layout'
import CatalogWizardPage from '@components/pages/CatalogWizardPage'
import routes from '@lib/routes'
import { useRouter } from 'next/router'
import React from 'react'

const Page = () => {
  const router = useRouter()

  const { wizardPath } = router.query

  React.useEffect(() => {
    if (typeof wizardPath === 'undefined') {
      router.replace(routes.internal.catalog.wizard.welcome.href())
    }
  }, [router, wizardPath])

  if (!Array.isArray(wizardPath)) {
    return null
  }

  return <CatalogWizardPage path={wizardPath} />
}

Page.getLayout = (page: React.ReactElement) => (
  <FocusedLayout>{page}</FocusedLayout>
)

export default Page
