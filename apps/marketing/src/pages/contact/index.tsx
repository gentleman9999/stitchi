import { PrimaryLayout } from '@components/layout'
import { StartPage } from '@components/pages'
import { ReactElement } from 'react'

const Start = () => {
  return <StartPage />
}

Start.getLayout = (page: ReactElement) => <PrimaryLayout>{page}</PrimaryLayout>

export default Start
