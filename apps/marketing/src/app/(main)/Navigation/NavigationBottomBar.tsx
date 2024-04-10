'use client'

import {
  NavigationSiteCategoryTreeFragment,
  NavigationSiteFragment,
} from '@generated/types'
import routes from '@lib/routes'
import { cn } from '@lib/utils'
import Link from 'next/link'
import React from 'react'
import { useSearch } from '../search-context'
import SearchBar from './SearchBar'
import Container from '@components/ui/Container'
import NavigationDropdownMenu from '../../NavigationDropdownMenu'
import {
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'

interface Props {
  rootCategory: NavigationSiteFragment['categoryTree'][number]
}

const NavigationBottomBar = ({ rootCategory }: Props) => {
  const { showSearch } = useSearch()

  return (
    <>
      <Container
        className="max-w-none flex items-stretch"
        containerClassName={cn('hidden h-auto', {
          'flex lg:hidden': showSearch,
        })}
      >
        <SearchBar />
      </Container>
      <Container
        containerClassName={cn('', {
          'hidden lg:block': showSearch,
        })}
        className="overflow-x-scroll no-scrollbar flex gap-4 max-w-none"
      >
        {rootCategory.children.map(category => (
          <NavigationDropdownMenu
            key={category.entityId}
            trigger={
              <DropdownMenuTrigger className="whitespace-nowrap text-sm my-1">
                {category.name}
              </DropdownMenuTrigger>
            }
          >
            {renderMenuContent(category.children as any)}
          </NavigationDropdownMenu>
        ))}
      </Container>
    </>
  )
}

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
            <li
              key={subCategory.entityId}
              className={cn({
                'mt-6': Boolean(idx > 0 && column[idx - 1].children?.length),
              })}
            >
              <ul>
                <li>
                  <DropdownMenuItem asChild>
                    <Link
                      className={'whitespace-nowrap text-lg font-medium'}
                      href={routes.internal.catalog.category.show.href({
                        categorySlug: subCategory.path,
                      })}
                    >
                      {subCategory.name}
                    </Link>
                  </DropdownMenuItem>

                  {subCategory.children ? (
                    <>
                      {subCategory.children.map(subCategory => (
                        <li key={subCategory.entityId}>
                          <DropdownMenuItem asChild>
                            <Link
                              className="whitespace-nowrap text-sm"
                              href={routes.internal.catalog.category.show.href({
                                categorySlug: subCategory.path,
                              })}
                            >
                              {subCategory.name}
                            </Link>
                          </DropdownMenuItem>
                        </li>
                      ))}
                    </>
                  ) : null}
                </li>
              </ul>
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}

export default NavigationBottomBar
