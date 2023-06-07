import { gql, useQuery } from '@apollo/client'
import { PrimaryLayout } from '@components/layout'
import DesignLibraryCategoryIndexPage from '@components/pages/DesignLibraryCategoryIndexPage'
import { DesignLibraryCategoryIndexPageQuery } from '@generated/DesignLibraryCategoryIndexPageQuery'
import { addApolloState, initializeApollo } from '@lib/apollo'
import { GetStaticProps } from 'next'
import React from 'react'

const getStaticProps: GetStaticProps = async () => {
  const client = initializeApollo()

  await client.query<DesignLibraryCategoryIndexPageQuery>({
    query: GET_DATA,
  })

  return addApolloState(client, {
    props: {},
  })
}

const Page = () => {
  const { data } = useQuery<DesignLibraryCategoryIndexPageQuery>(GET_DATA)

  return (
    <DesignLibraryCategoryIndexPage
      categories={data?.allDesignCategories || []}
    />
  )
}

Page.getLayout = (page: React.ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

const GET_DATA = gql`
  ${DesignLibraryCategoryIndexPage.fragments.category}
  query DesignLibraryCategoryIndexPageQuery {
    allDesignCategories(first: 100) {
      id
      ...DesignLibraryCategoryIndexPageCategoryFragment
    }
  }
`

export default Page
export { getStaticProps }
