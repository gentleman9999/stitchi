import { Container } from '@/components/ui'
import routes from '@/lib/routes'
import { FragmentType, getFragmentData, gql } from '@/__generated__'
import Link from 'next/link'
import React from 'react'

interface Props {
  featuredCategories?: FragmentType<typeof CompanyCategorySectionCompany> | null
  productTypeCategories?: FragmentType<
    typeof CompanyCategorySectionCompany
  > | null
  supplyChainCategories?: FragmentType<
    typeof CompanyCategorySectionCompany
  > | null
}

export default function CompanyCategorySection(props: Props) {
  const supplyChainCategories = getFragmentData(
    CompanyCategorySectionCompany,
    props.supplyChainCategories,
  )

  const productTypeCategories = getFragmentData(
    CompanyCategorySectionCompany,
    props.productTypeCategories,
  )

  const featuredCategories = getFragmentData(
    CompanyCategorySectionCompany,
    props.featuredCategories,
  )

  return (
    <div className="bg-gray-50">
      <Container>
        <section className="flex flex-col gap-8 sm:gap-10 md:gap-16 py-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading">
            Explore companies
          </h2>

          <div className="flex flex-col gap-16">
            <h3 className="sr-only">Featured categories</h3>
            <CategoryList
              categories={featuredCategories?.children?.map(c => ({
                slug: c?.slug,
                title: c?.title,
              }))}
            />

            <CategoryList
              title="By type"
              categories={supplyChainCategories?.children?.map(c => ({
                slug: c?.slug,
                title: c?.title,
              }))}
            />

            <CategoryList
              title="By product"
              categories={productTypeCategories?.children?.map(c => ({
                slug: c?.slug,
                title: c?.title,
              }))}
            />
          </div>
        </section>
      </Container>
    </div>
  )
}

const CategoryList = ({
  title,
  categories,
}: {
  title?: string
  categories?: ({ slug?: string | null; title?: string | null } | null)[]
}) => {
  if (!categories) return null

  return (
    <div className="flex flex-col gap-8">
      {title ? (
        <h3 className="text-3xl font-semibold font-heading">{title}</h3>
      ) : null}
      <ul className="flex gap-2 sm:gap-3 md:gap-4 flex-wrap">
        {categories.map(category =>
          category?.slug ? (
            <li key={category.slug}>
              <Link
                className="p-2 sm:p-3 md:p-4 border text-center font-semibold rounded-md hover:border-gray-400 block transition-all"
                href={routes.internal.directory.categories.show.href({
                  categorySlug: category.slug,
                })}
              >
                {category.title}
              </Link>
            </li>
          ) : null,
        )}
      </ul>
    </div>
  )
}

export const CompanyCategorySectionCompany = gql(/* GraphQL */ `
  fragment CompanyCategorySectionCompany on GlossaryCategoryRecord {
    id
    slug
    children {
      id
      title
      slug
    }
  }
`)
