import { gql } from '@apollo/client'
import {
  LookbookCategoriesIndexPageGetDataQuery,
  LookbookCategoriesIndexPageGetDataQueryVariables,
} from '@generated/types'
import { getClient } from '@lib/apollo-rsc'
import React from 'react'
import routes from '@lib/routes'
import DesignLibraryCategoryIndexPage from './DesignLibraryCategoryIndexPage'

const title = 'Browse our custom merch design inspiration categories'
const description =
  'Explore a vast array of custom merch design inspiration across multiple categories. Find unique ideas for t-shirts, hats, and more to express your style or brand. Perfect for businesses, events, and personal projects. Start your creative journey with us!'

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: routes.internal.lookbook.categories.href(),
  },
}

const Page = async () => {
  const client = await getClient()
  const { data } = await client.query<
    LookbookCategoriesIndexPageGetDataQuery,
    LookbookCategoriesIndexPageGetDataQueryVariables
  >({ query: GET_DATA })

  const categories = data.allDesignCategories || []

  return <DesignLibraryCategoryIndexPage categories={categories} />
}

const GET_DATA = gql`
  query LookbookCategoriesIndexPageGetDataQuery {
    allDesignCategories(first: 100) {
      id
      slug
      name
    }
  }
`

export default Page
