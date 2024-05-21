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
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import PopperButton from './PopperButton'
import Popper from './Popper'
import { HIDDEN_BIGCOMMERCE_PRODUCT_IDS } from '@lib/constants'
import NavigationPopperContainer from './NavigationPopperContainer'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { usePopper } from './PopperContext'

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
        className="overflow-x-scroll no-scrollbar flex max-w-none"
      >
        <ul className="flex gap-4">
          {rootCategory.children
            .filter(
              category =>
                !HIDDEN_BIGCOMMERCE_PRODUCT_IDS.includes(
                  category.entityId.toString(),
                ),
            )
            .map(category => (
              <Popper
                key={category.entityId}
                Trigger={<PrimaryNavigationMenuTrigger category={category} />}
                Content={
                  <NavigationPopperContainer className="pt-3 !w-[100vw]">
                    <div className="p-4">
                      <PopperButton>
                        <Link
                          href={routes.internal.catalog.category.show.href({
                            categorySlug: category.path,
                          })}
                        >
                          <div className="mt-2 text-3xl font-bold hover:underline underline-offset-4 transition-all flex items-center gap-2">
                            All {category.name}{' '}
                            <ArrowRightIcon className="h-5 w-5" />
                          </div>
                        </Link>
                      </PopperButton>
                      {renderMenuContent(category.children)}
                    </div>
                  </NavigationPopperContainer>
                }
              />
            ))}
        </ul>
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
      className="flex flex-wrap gap-8 mt-4"
      style={{
        gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
      }}
    >
      {columns.map((column, key) => (
        <ul key={key} className="flex-1 flex flex-col">
          {column.map((subCategory, idx) => (
            <li
              key={subCategory.entityId}
              className={cn('flex flex-col gap-3', {
                'mt-6': Boolean(idx > 0 && column[idx - 1].children?.length),
              })}
            >
              <PopperButton>
                <Link
                  className={
                    'whitespace-nowrap text-xl font-semibold hover:underline underline-offset-4 transition-all'
                  }
                  href={routes.internal.catalog.category.show.href({
                    categorySlug: subCategory.path,
                  })}
                >
                  {subCategory.name}
                </Link>
              </PopperButton>

              {subCategory.children ? (
                <ul className="flex flex-col gap-2">
                  {subCategory.children.map(subCategory => (
                    <li key={subCategory.entityId}>
                      <PopperButton>
                        <Link
                          className="whitespace-nowrap text-xl text-gray-700 hover:underline underline-offset-4 transition-all"
                          href={routes.internal.catalog.category.show.href({
                            categorySlug: subCategory.path,
                          })}
                        >
                          {subCategory.name}
                        </Link>
                      </PopperButton>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}

const PrimaryNavigationMenuTrigger = React.forwardRef<
  HTMLDivElement,
  { category: { path: string; name: string } }
>(({ category }, ref) => {
  const popper = usePopper()
  const [touchCount, setTouchCount] = React.useState(0)

  const handleTouchEnd = (e: React.TouchEvent<HTMLAnchorElement>) => {}

  const [wasTouched, setWasTouched] = React.useState(false)

  const handleTouchStart = () => {
    setWasTouched(true)
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (wasTouched) {
      if (touchCount === 0) {
        e.preventDefault()
        setTouchCount(1)

        setTimeout(() => {
          setTouchCount(0)
        }, 2000)
      } else {
        setTouchCount(0)
        popper.hide()
      }

      setWasTouched(false) // Reset the flag
    } else {
      console.log('Button was clicked')
    }
  }

  return (
    <div ref={ref}>
      <Link
        onTouchEnd={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onClick={handleClick}
        href={routes.internal.catalog.category.show.href({
          categorySlug: category.path,
        })}
        className="flex font-medium whitespace-nowrap text-sm my-1 text-black items-center hover:underline underline-offset-4"
      >
        {category.name}
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </Link>
    </div>
  )
})

PrimaryNavigationMenuTrigger.displayName = 'PrimaryNavigationMenuTrigger'

export default NavigationBottomBar
