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
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@components/ui/navigation-menu'
import SearchBar from './SearchBar'
import LearnContentsDesktop from './LearnContentsDesktop'

type CategoryTreeItemWithChildren = NavigationSiteCategoryTreeFragment & {
  children?: CategoryTreeItemWithChildren[]
}

const MAX_ITEMS_PER_COLUMN = 15

const renderMenuContent = (subCategories: CategoryTreeItemWithChildren[]) => {
  if (!subCategories) {
    return null
  }

  const columns = []

  let currentColumn: CategoryTreeItemWithChildren[] = []

  for (const category of subCategories) {
    const currentColumnLength = currentColumn.reduce((acc, category) => {
      return acc + 1 + (category.children?.length || 0)
    }, 0)

    const newColumnLength =
      currentColumnLength + 1 + (category.children?.length || 0)

    if (currentColumnLength > 0 && newColumnLength > MAX_ITEMS_PER_COLUMN) {
      columns.push(currentColumn)
      currentColumn = [category]
    } else {
      currentColumn.push(category)
    }
  }

  if (currentColumn.length > 0) {
    columns.push(currentColumn)
  }

  return (
    <div
      className="grid gap-8"
      style={{
        gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
      }}
    >
      {columns.map((column, key) => (
        <ul key={key} className="col-span-1 flex flex-col">
          {column.map((subCategory, idx) => (
            <NavigationMenuLink
              key={subCategory.entityId}
              asChild
              className={cx({
                'mt-6': Boolean(idx > 0 && column[idx - 1].children?.length),
              })}
            >
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
                            className={'whitespace-nowrap text-sm'}
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
        </ul>
      ))}
    </div>
  )
}

interface Props {
  categoryTree: NavigationSiteFragment['categoryTree']
}

const Navigation = ({ categoryTree }: Props) => {
  const rootCategory = categoryTree[0]

  return (
    <>
      <TopBarContainer>
        <NavigationMenu>
          <NavigationMenuList className="flex-1 flex flex-row justify-between items-center gap-4">
            <div className="flex-1 flex items-center flex-row gap-4">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href={routes.internal.home.href()}
                    passHref
                    className="contents"
                  >
                    <Logo className="h-[30px]" background="dark" />
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem className="flex-1 max-w-[400px] ">
                <SearchBar />
              </NavigationMenuItem>

              <NavigationMenuItem>
                <TopBarNavigationMenuTrigger>
                  <div className="text-left leading-none">
                    <span className="text-xs">Our</span>
                    <br />
                    <span className="text-base">Services</span>
                  </div>
                </TopBarNavigationMenuTrigger>

                <NavigationMenuContent>
                  <ul className="p-6">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href={routes.internal.solutions.design.href()}
                          className="block p-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Custom Design
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href={routes.internal.solutions.customization.href()}
                          className="block p-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Bulk Orders
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href={routes.internal.solutions.distribution.href()}
                          className="block p-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Express Delivery
                        </Link>
                      </NavigationMenuLink>
                    </li>

                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href={routes.internal.solutions.swagBox.href()}
                          className="block p-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Unwrapping Experiences
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <TopBarNavigationMenuTrigger>
                  <div className="text-left leading-none">
                    <span className="text-xs">Learning &</span>
                    <br />
                    <span className="text-base">Resources</span>
                  </div>
                </TopBarNavigationMenuTrigger>
                <NavigationMenuContent>
                  <LearnContentsDesktop />
                </NavigationMenuContent>
              </NavigationMenuItem>
            </div>

            <AppTopbarUser background="dark" />
          </NavigationMenuList>
        </NavigationMenu>
      </TopBarContainer>
      <BottomBarContainer>
        <NavigationMenu>
          <NavigationMenuList>
            {rootCategory.children.map(category => (
              <NavigationMenuItem key={category.entityId}>
                <NavigationMenuTrigger>{category.name}</NavigationMenuTrigger>
                <NavigationMenuContent className="p-6">
                  {renderMenuContent(category.children as any)}
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}

            <NavigationMenuIndicator />
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
    <div
      className={cx('transition-all border-b bg-midnight relative z-20 py-1')}
    >
      <Container className="max-w-none flex items-center h-full">
        {children}
      </Container>
    </div>
  )
}

const TopBarNavigationMenuTrigger = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <NavigationMenuTrigger className="h-full py-0.5 bg-transparent rounded-sm text-white hover:text-white hover:bg-transparent hover:border-gray-200 border-transparent border">
      {children}
    </NavigationMenuTrigger>
  )
}

const BottomBarContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="sticky top-0 border-b bg-white z-10 py-0.5">{children}</div>
  )
}

export default Navigation
