import React, { ReactElement } from 'react'
import Head from 'next/head'
import { PrimaryLayout } from '@components/layout'
import { HomePage } from '@components/pages'

const Home = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </>
  )
}

Home.getLayout = (page: ReactElement) => <PrimaryLayout>{page}</PrimaryLayout>

export default Home
