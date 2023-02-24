import { PrimaryLayout } from '@components/layout'
import React, { ReactElement } from 'react'
import { IndustryTermsCategoryShowPage } from '@components/pages'
import { GetStaticPaths, GetStaticProps } from 'next'
import { gql, useQuery } from '@apollo/client'
import { addApolloState, initializeApollo } from '@lib/apollo'
import { PromotionalProductsGlossaryCategoryGetPagesQuery } from '@generated/PromotionalProductsGlossaryCategoryGetPagesQuery'
import { notEmpty } from '@utils/typescript'
import {
  PromotionalProductsGlossaryCategoryGetDataQuery,
  PromotionalProductsGlossaryCategoryGetDataQueryVariables,
} from '@generated/PromotionalProductsGlossaryCategoryGetDataQuery'
import { useRouter } from 'next/router'
import { ComponentErrorMessage } from '@components/common'
import { NextSeo } from 'next-seo'
import makeAbsoluteUrl from '@utils/get-absolute-url'
import routes from '@lib/routes'

// const getStaticPaths: GetStaticPaths = async () => {
//   const client = initializeApollo()

//   const { data } =
//     await client.query<PromotionalProductsGlossaryCategoryGetPagesQuery>({
//       query: GET_PAGES,
//     })

//   return {
//     paths: data.allGlossaryCategories
//       .map(category =>
//         category.slug
//           ? {
//               params: { categorySlug: category.slug },
//             }
//           : null,
//       )
//       .filter(notEmpty),
//     fallback: 'blocking',
//   }
// }

// const getStaticProps: GetStaticProps = async ({ params }) => {
//   const { categorySlug } = params || {}

//   if (typeof categorySlug !== 'string') {
//     return {
//       notFound: true,
//     }
//   }

//   const client = initializeApollo()

//   await client.query<
//     PromotionalProductsGlossaryCategoryGetDataQuery,
//     PromotionalProductsGlossaryCategoryGetDataQueryVariables
//   >({
//     query: GET_DATA,
//     variables: { slug: categorySlug },
//   })

//   return addApolloState(client, { props: {} })
// }

const PromotionalProductsGlossaryCategory = () => {
  const { query } = useRouter()
  const { data, error } = useQuery<
    PromotionalProductsGlossaryCategoryGetDataQuery,
    PromotionalProductsGlossaryCategoryGetDataQueryVariables
  >(GET_DATA, { variables: { slug: `${query.categorySlug}` } })

  if (error) {
    return <ComponentErrorMessage error={error} />
  }

  const { glossaryCategory } = data || {}

  if (!glossaryCategory?.slug) {
    return null
  }

  const url = makeAbsoluteUrl(
    routes.internal.glossary.categories.show.href(glossaryCategory.slug),
  )

  return (
    <>
      <NextSeo
        title={
          glossaryCategory.seoMetadata?.title ||
          glossaryCategory.title ||
          'Promotional Product Glossary Category'
        }
        description={glossaryCategory.seoMetadata?.description || undefined}
        canonical={url}
        openGraph={{
          url,
        }}
      />
      <IndustryTermsCategoryShowPage
        category={glossaryCategory}
        entries={glossaryCategory._allReferencingGlossaryEntries}
      />
    </>
  )
}

PromotionalProductsGlossaryCategory.getLayout = (page: ReactElement) => {
  return <PrimaryLayout>{page}</PrimaryLayout>
}

const GET_PAGES = gql`
  query PromotionalProductsGlossaryCategoryGetPagesQuery {
    allGlossaryCategories(first: 100) {
      id
      slug
    }
  }
`

const GET_DATA = gql`
  ${IndustryTermsCategoryShowPage.fragments.category}
  ${IndustryTermsCategoryShowPage.fragments.entry}
  query PromotionalProductsGlossaryCategoryGetDataQuery($slug: String!) {
    glossaryCategory(filter: { slug: { eq: $slug } }) {
      id
      slug
      title
      seoMetadata {
        title
        description
      }
      _allReferencingGlossaryEntries {
        id
        ...IndustryTermsCategoryShowPageEntryFragment
      }

      ...IndustryTermsCategoryShowPageCategoryFragment
    }
  }
`

// export { getStaticPaths, getStaticProps }
export default PromotionalProductsGlossaryCategory
