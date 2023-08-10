import { ClosetLayout } from '@components/layout'
import ClosetHomePage from '@components/pages/ClosetHomePage'
import routes from '@lib/routes'
import { GetServerSideProps } from 'next'
import React from 'react'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: routes.internal.closet.designs.href(),
      permanent: false,
    },
  }
}

const Page = () => {
  return <ClosetHomePage />
}

Page.getLayout = (page: React.ReactElement) => (
  <ClosetLayout>{page}</ClosetLayout>
)

export default Page
