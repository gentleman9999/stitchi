import { PrimaryLayout } from '@components/layout'
import SolutionsSwagBoxes from '@components/pages/SolutionsSwagBoxes'
import { ReactElement } from 'react'

const Page = () => {
  return <SolutionsSwagBoxes />
}

Page.getLayout = (page: ReactElement) => <PrimaryLayout>{page}</PrimaryLayout>

export default Page
