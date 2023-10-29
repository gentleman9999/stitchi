import { gql } from '@apollo/client'
import {
  CmsImage,
  CmsSeo,
  FeaturedProductsGrid,
  Section,
  SectionHeader,
} from '@components/common'
import CustomerLogoBanner from '@components/common/CustomerLogoBanner'
import Container from '@components/ui/Container'
import LinkInline from '@components/ui/LinkInline'
import { DesignLibraryCategoryShowPageCatalogFragment } from '@generated/DesignLibraryCategoryShowPageCatalogFragment'
import { DesignLibraryCategoryShowPageDesignCategoryFragment } from '@generated/DesignLibraryCategoryShowPageDesignCategoryFragment'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import { ArrowRight } from 'icons'
import React from 'react'

interface Props {
  site: DesignLibraryCategoryShowPageCatalogFragment
  category: DesignLibraryCategoryShowPageDesignCategoryFragment
}

const DesignLibraryCategoryShowPage = ({ site, category }: Props) => {
  const featuredImage = category?._allReferencingDesigns?.[0]?.primaryImage

  return (
    <>
      <CmsSeo
        seo={category?._seoMetaTags || []}
        canonicalUrl={makeAbsoluteUrl(
          category
            ? routes.internal.lookbook.categories.show.href({
                categorySlug: category.slug || '',
              })
            : routes.internal.lookbook.href(),
        )}
      />
      <Container>
        <Section gutter="md">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 md:gap-12 lg:gap-20">
            <div>
              <h1 className="text-5xl font-headingDisplay font-bold capitalize mb-4">
                Custom {category.name} shirts
              </h1>
              <p className="max-w-3xl text-xl">
                Boost your brand with our {category.name?.toLocaleLowerCase()}
                -themed promotional products. Uniquely designed to resonate with
                your target audience, our range provides an engaging touch to
                any event or campaign.
              </p>
            </div>
            <div className="relative max-w-xs sm:max-w-[200px] md:max-w-[225px] lg:max-w-xs">
              {featuredImage?.responsiveImage ? (
                <CmsImage data={featuredImage.responsiveImage} />
              ) : null}
            </div>
          </div>
        </Section>
      </Container>

      <Section gutter="md">
        <CustomerLogoBanner />
      </Section>

      <Container>
        <Section gutter="md">
          <SectionHeader
            title={`Browse our collection of ${category.name?.toLocaleLowerCase()} shirt designs`}
          />
          <div className="flex justify-center">
            <LinkInline
              href={routes.internal.lookbook.href()}
              className="mt-4 no-underline flex items-center"
            >
              View all designs{' '}
              <span className="ml=2">
                <ArrowRight width={14} strokeWidth={2} />
              </span>
            </LinkInline>
          </div>
        </Section>
      </Container>

      <div className="overflow-x-scroll no-scrollbar pb-20">
        <Container>
          <div className="">
            <div className="grid grid-flow-col gap-8">
              {category._allReferencingDesigns?.map(design =>
                design.primaryImage?.responsiveImage ? (
                  <div
                    key={design.id}
                    className="overflow-hidden min-w-[200px] rounded-md shadow-magical"
                  >
                    <CmsImage data={design.primaryImage?.responsiveImage} />
                  </div>
                ) : null,
              )}
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <Section gutter="md">
          <SectionHeader
            title=""
            subtitle="Bring your designs to life on a wide range of customizable products."
          />
        </Section>

        <FeaturedProductsGrid catalog={site} />
      </Container>
    </>
  )
}

DesignLibraryCategoryShowPage.fragments = {
  site: gql`
    ${FeaturedProductsGrid.fragments.catalog}
    fragment DesignLibraryCategoryShowPageCatalogFragment on Site {
      ...FeaturedProductsGridCatalogFragment
    }
  `,
  category: gql`
    ${CmsImage.fragments.image}
    ${CmsSeo.fragments.seoTags}
    fragment DesignLibraryCategoryShowPageDesignCategoryFragment on DesignCategoryRecord {
      id
      name
      slug
      _seoMetaTags {
        ...CmsSeoTagsFragment
      }
      _allReferencingDesigns {
        id
        primaryImage {
          id
          responsiveImage {
            ...CmsImageFragment
          }
        }
      }
    }
  `,
}

export default DesignLibraryCategoryShowPage
