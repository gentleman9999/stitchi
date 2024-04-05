import React from 'react'
import Link from 'next/link'
import routes from '@lib/routes'
import Logo from '@components/ui/Logo'
import Container from '@components/ui/Container'
import cx from 'classnames'
import AppTopbarUser from 'app/AppTopbarUser'
import { gql } from '@apollo/client'
import {
  NavigationSiteCategoryTreeFragment,
  NavigationSiteFragment,
} from '@generated/types'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@components/ui/navigation-menu'
import { cn } from '@lib/utils'

type CategoryTreeItemWithChildren = NavigationSiteCategoryTreeFragment & {
  children?: CategoryTreeItemWithChildren[]
}

const MAX_ITEMS_PER_COLUMN = 20

let itemCount = 0

const renderSubCategories = (
  subCategories?: CategoryTreeItemWithChildren[],
  depth: number = 0,
) => {
  if (!subCategories || depth > 1) {
    return null
  }

  const columns = []
  let currentColumn: CategoryTreeItemWithChildren[] = []

  subCategories.forEach(subCategory => {
    if (subCategory.children) {
      renderSubCategories(subCategory.children, depth + 1)
    }

    if (
      subCategory.children &&
      itemCount + subCategory.children.length > MAX_ITEMS_PER_COLUMN &&
      itemCount > 0
    ) {
      columns.push(currentColumn)
      currentColumn = []
      itemCount = 0
    }
    currentColumn.push(subCategory)
    itemCount += subCategory.children?.length || 0
  })

  if (currentColumn.length > 0) {
    columns.push(currentColumn)
  }

  return columns.map(column => (
    <>
      {column.map(subCategory => (
        <NavigationMenuLink key={subCategory.entityId} asChild>
          <li>
            <Link
              className={'whitespace-nowrap text-lg font-medium'}
              href={routes.internal.catalog.category.show.href({
                categorySlug: subCategory.path,
              })}
            >
              {subCategory.name}
            </Link>

            {subCategory.children ? (
              <>
                {subCategory.children.map(subCategory => (
                  <NavigationMenuLink key={subCategory.entityId} asChild>
                    <li>
                      <Link
                        className={'whitespace-nowrap text-base'}
                        href={routes.internal.catalog.category.show.href({
                          categorySlug: subCategory.path,
                        })}
                      >
                        {subCategory.name}
                      </Link>
                    </li>
                  </NavigationMenuLink>
                ))}
              </>
            ) : null}
          </li>
        </NavigationMenuLink>
      ))}
    </>
  ))
}

interface Props {
  categoryTree: NavigationSiteFragment['categoryTree']
}

const Navigation = ({ categoryTree }: Props) => {
  const rootCategory = categoryTree[0]

  return (
    <>
      <TopBarContainer>
        <div className="flex-1 flex flex-row justify-between items-center gap-4">
          <Link
            href={routes.internal.home.href()}
            passHref
            className="contents"
          >
            <Logo className="h-[30px]" />
          </Link>

          <div className="flex-1 flex flex-row gap-4">
            <div className="w-full max-w-[300px] h-[40px] border rounded-md" />
          </div>
        </div>

        <AppTopbarUser />
      </TopBarContainer>
      <BottomBarContainer>
        <NavigationMenu>
          <NavigationMenuList>
            {rootCategory.children.map(category => (
              <NavigationMenuItem key={category.entityId}>
                <NavigationMenuTrigger>{category.name}</NavigationMenuTrigger>
                <NavigationMenuContent className="p-4 max-h-[40vh]">
                  <ul className="flex flex-col flex-wrap gap-8">
                    {/* {renderSubCategories(category.children as any)} */}
                    {category.children.map(subCategory => (
                      <NavigationMenuLink key={subCategory.entityId} asChild>
                        <li>
                          <Link
                            className="whitespace-nowrap text-lg font-medium"
                            href={routes.internal.catalog.category.show.href({
                              categorySlug: subCategory.path,
                            })}
                          >
                            {subCategory.name}
                          </Link>

                          <ul>
                            {subCategory.children.map(subSubCategory => (
                              <li key={subSubCategory.entityId}>
                                <Link
                                  className="whitespace-nowrap"
                                  href={routes.internal.catalog.category.show.href(
                                    {
                                      categorySlug: subSubCategory.path,
                                    },
                                  )}
                                >
                                  {subSubCategory.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </NavigationMenuLink>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </BottomBarContainer>
    </>
  )
}

const CategoryTreeFragment = gql`
  fragment NavigationSiteCategoryTreeFragment on CategoryTreeItem {
    entityId
    name
    path
    productCount
  }
`

Navigation.fragments = {
  site: gql`
    ${CategoryTreeFragment}

    fragment NavigationSiteFragment on Site {
      categoryTree(rootEntityId: 0) {
        ...NavigationSiteCategoryTreeFragment
        children {
          ...NavigationSiteCategoryTreeFragment
          children {
            ...NavigationSiteCategoryTreeFragment
            children {
              ...NavigationSiteCategoryTreeFragment
            }
          }
        }
      }
    }
  `,
}

const TopBarContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cx('h-[56px] transition-all border-b')}>
      <Container className="max-w-none flex items-center h-full">
        <nav className={'flex-1 flex'}>{children}</nav>
      </Container>
    </div>
  )
}

const BottomBarContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="sticky top-0 h-[43px] border-b z-40">{children}</div>
}

export default Navigation
