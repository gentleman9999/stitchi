import { gql, useQuery } from '@apollo/client'
import { Footer } from '@components/common'
import { CatalogLayoutGetDataQuery } from '@generated/CatalogLayoutGetDataQuery'
import { useRouter } from 'next/router'
import React from 'react'
import AppTopbar from '../AppTopbar'
import PageloadProgressIndicator from '../PageloadProgressIndicator'
import SupportWidget from './SupportWidget'

interface Props {
  children: React.ReactNode
}

const CatalogLayout = ({ children }: Props) => {
  const { data } = useQuery<CatalogLayoutGetDataQuery>(GET_DATA)

  const router = useRouter()

  const supportDefaultOpen = router.asPath.startsWith('/wizard/')

  return (
    <>
      <PageloadProgressIndicator />
      <SupportWidget defaultOpen={supportDefaultOpen} />
      <div className="h-full relative">
        <AppTopbar membership={data?.viewer || null} />
      </div>
      <main className="min-h-[calc(100vh-56px)] mt-[56px] relative">
        {children}
      </main>

      <Footer />
    </>
  )
}

const GET_DATA = gql`
  ${AppTopbar.fragments.membership}
  query CatalogLayoutGetDataQuery {
    viewer {
      id
      ...AppTopbarMembershipFragment
    }
  }
`

export default CatalogLayout
