import { ArrowLeftCircleIcon, ArrowLeftIcon } from '@heroicons/react/20/solid'
import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'
import { useClosetLayoutContext } from '../closet-layout-context'
import NavItem from './NavItem'

interface Props {}

const SecondarySideBar = (props: Props) => {
  const { navigation, activeNavItem, handleNavigate } = useClosetLayoutContext()

  const parentNavItem = React.useMemo(() => {
    return (
      navigation.primary.find(navItem =>
        Boolean(
          navItem.subNavItems?.find(
            subNavItem => subNavItem.href === activeNavItem?.href,
          ),
        ),
      ) ||
      navigation.secondary.find(navItem =>
        Boolean(
          navItem.subNavItems?.find(
            subNavItem => subNavItem.href === activeNavItem?.href,
          ),
        ),
      )
    )
  }, [activeNavItem?.href, navigation.primary, navigation.secondary])

  return (
    <div className="relative flex flex-col p-2 gap-2 h-full">
      <Link
        href={routes.internal.closet.href()}
        className="text-sm text-gray-700 font-medium"
      >
        <button className="border p-1 rounded-sm mr-3">
          <ArrowLeftIcon className="w-3 h-3" />
        </button>
        {parentNavItem?.label}
      </Link>
      <hr className="my-y" />
      <div>
        <ul className="flex flex-col gap-1">
          {parentNavItem?.subNavItems
            ?.filter(link => !link.hidden)
            .map(link => (
              <li key={link.href}>
                <NavItem
                  {...link}
                  active={activeNavItem?.href === link.href}
                  onClick={() => handleNavigate(link)}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default SecondarySideBar
