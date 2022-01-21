import { ChevronDown } from 'icons'
import dynamic from 'next/dynamic'
import React from 'react'
import cx from 'classnames'
import Link from 'next/link'
import useDropdown from './useDropdown'
import { Navigation } from './useNavigation'
import routes from '@lib/routes'
import { Button } from 'ui'
import s from './NavbarDesktop.module.css'

const NavbarDropdown = dynamic(() => import('./NavbarDropdown'))
const NavbarDropdownItemDesktop = dynamic(() => import('./NavbarItemDesktop'))

const DropdownButton = ({
  label,
  onClick,
  expanded,
}: {
  label: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
  expanded: boolean
}) => {
  return (
    <button className={s.link} onClick={onClick} value={label}>
      {label}
      <ChevronDown
        className={cx(
          '-mr-1 ml-2 h-5 w-5 transition-transform',
          expanded && 'transform rotate-180',
        )}
        aria-hidden="true"
      />
    </button>
  )
}

interface Props {
  anchorEl: HTMLElement | null
  navigation: Navigation
}

const NavbarDesktop = ({ anchorEl, navigation }: Props) => {
  const { active, handleClick } = useDropdown()

  return (
    <nav className="space-x-10">
      {navigation.map(item => {
        const key = item.label
        if ('href' in item) {
          return (
            <Link href={item.href} key={key}>
              <a className={s.link}>{item.label}</a>
            </Link>
          )
        } else {
          return (
            <div className="inline-flex" key={key}>
              <DropdownButton
                label={item.label}
                onClick={e => {
                  handleClick(item.label)
                }}
                expanded={active === item.label}
              />

              <NavbarDropdown
                onClose={() => handleClick(item.label)}
                open={active === item.label}
                anchorEl={anchorEl}
              >
                <div className="grid grid-cols-3 gap-4">
                  {item.subNav.map(subItem => (
                    <NavbarDropdownItemDesktop
                      key={subItem.label}
                      label={subItem.label}
                      href={subItem.href}
                      description={subItem.description}
                      icon={subItem.icon}
                    />
                  ))}
                </div>
              </NavbarDropdown>
            </div>
          )
        }
      })}

      <Link href={routes.internal.getStarted.href()} passHref>
        <Button
          Component="a"
          className="!py-1 !px-4 !font-extrabold !lowercase"
          color="brandPrimary"
        >
          Sign up
        </Button>
      </Link>
    </nav>
  )
}

export default NavbarDesktop
