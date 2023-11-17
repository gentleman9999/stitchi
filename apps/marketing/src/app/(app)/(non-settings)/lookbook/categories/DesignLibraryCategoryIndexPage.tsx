import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import ClosetSection from '@components/common/ClosetSection'
import Section from '@components/common/Section'
import Container from '@components/ui/Container'
import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'

interface Category {
  id: string
  slug: string | null
  name: string | null
}

interface Props {
  categories: Category[]
}

const DesignLibraryCategoryIndexPage = ({ categories }: Props) => {
  return (
    <ClosetPageContainer>
      <ClosetPageHeader>
        <ClosetPageTitle title="Custom merch categories" />
      </ClosetPageHeader>
      <ClosetSection>
        <ul className="flex flex-wrap gap-4">
          {categories.map(category => (
            <li key={category.id} className="border rounded-sm py-2 px-4">
              <Link
                href={
                  category.slug
                    ? routes.internal.lookbook.categories.show.href({
                        categorySlug: category.slug,
                      })
                    : '#'
                }
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </ClosetSection>
    </ClosetPageContainer>
  )
}

export default DesignLibraryCategoryIndexPage
