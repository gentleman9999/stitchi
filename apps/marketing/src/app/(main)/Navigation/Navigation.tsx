import React from 'react'
import Link from 'next/link'
import routes from '@lib/routes'
import Logo from '@components/ui/Logo'
import Container from '@components/ui/Container'
import cx from 'classnames'
import AppTopbarUser from '../../AppTopbarUser'
import { gql } from '@apollo/client'
import { NavigationSiteFragment } from '@generated/types'
import SearchBar from './SearchBar'
import LearnContentsDesktop from './LearnContentsDesktop'
import IconButton from '@components/ui/IconButton'
import { Bars3Icon, ChevronDownIcon } from '@heroicons/react/20/solid'
import MobileNavigation from './MobileNavigation'
import SearchButton from './SearchButton'
import NavigationBottomBar from './NavigationBottomBar'
import ServicesContentsDesktop from './ServicesContentsDesktop'
import Popper from './Popper'
import PopperBackdrop from '../../PopperBackdrop'
import NavigationContextProvider from '../../NavigationContext'
import NavigationPopperContainer from './NavigationPopperContainer'
import ChatWithUsButton from './ChatWithUsButton'

interface Props {
  categoryTree: NavigationSiteFragment['categoryTree']
}

const Navigation = ({ categoryTree }: Props) => {
  const rootCategory = categoryTree[0]

  return (
    <NavigationContextProvider>
      <TopNavContainer>
        <div className="flex-1 flex flex-row justify-between items-center gap-2 sm:gap-4">
          <MobileNavigation
            renderTrigger={
              <IconButton
                name="toggle navigation menu"
                className="md:!hidden -translate-x-2"
                variant="ghost"
              >
                <Bars3Icon className="h-5 w-5 text-white" />
              </IconButton>
            }
          />

          <Link
            href={routes.internal.home.href()}
            passHref
            className="contents"
          >
            <Logo className="h-[30px] shrink-0" background="dark" />
          </Link>

          <div className="flex-1 flex flex-row justify-between items-center gap-2 sm:gap-4">
            <div className="flex-1 flex items-stretch h-auto flex-row gap-4">
              <SearchBar className="max-w-[500px] hidden lg:flex" />

              <Popper
                Trigger={
                  <TopBarNavigationMenuTrigger
                    href={routes.internal.solutions.href()}
                    title="Services"
                    preTitle="Our"
                  />
                }
                Content={
                  <NavigationPopperContainer className="pt-2">
                    <ServicesContentsDesktop />
                  </NavigationPopperContainer>
                }
              />

              <Popper
                Trigger={
                  <TopBarNavigationMenuTrigger
                    title="Resources"
                    preTitle="Learning &"
                  />
                }
                Content={
                  <NavigationPopperContainer className="pt-2">
                    <LearnContentsDesktop />
                  </NavigationPopperContainer>
                }
              />
            </div>

            <div className="lg:hidden">
              <SearchButton />
            </div>

            <div className="hidden lg:block">
              <ChatWithUsButton />
            </div>

            <AppTopbarUser background="dark" />
          </div>
        </div>
      </TopNavContainer>
      <BottomNavContainer>
        <NavigationBottomBar rootCategory={rootCategory} />
      </BottomNavContainer>

      <PopperBackdrop />
    </NavigationContextProvider>
  )
}

const TopNavContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav
      aria-label="Primary navigation"
      className={cx('transition-all border-b bg-midnight relative z-30 py-2')}
    >
      <Container className="max-w-none flex items-center h-full">
        {children}
      </Container>
    </nav>
  )
}

const BottomNavContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav
      aria-label="Product categories navigation"
      className="sticky top-0 border-b h-[39px] flex flex-column bg-white py-1 z-20"
    >
      {children}
    </nav>
  )
}

const TopBarNavigationMenuTrigger = ({
  href,
  title,
  preTitle,
}: {
  href?: string
  title: string
  preTitle?: string
}) => {
  const Component = href ? Link : 'button'

  return (
    <Component
      {...((href ? { href } : {}) as any)}
      className="hidden md:flex h-full py-0.5 px-1 bg-transparent rounded-sm text-white hover:text-white hover:bg-transparent hover:border-gray-200 border-transparent border text-left"
    >
      <div className="flex flex-col">
        {preTitle ? (
          <>
            <span className="text-xs leading-none">{preTitle}</span>
          </>
        ) : null}

        <span className="text-base font-medium leading-none">{title}</span>
      </div>
      <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
    </Component>
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

export default Navigation
