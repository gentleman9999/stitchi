import { ChevronDown, HamburgerMenu } from 'icons'
import React from 'react'
import { Navigation } from './useNavigation'
import Link from 'next/link'
import cx from 'classnames'
import s from './NavbarMobile.module.css'

import useDropdown from './useDropdown'
import dynamic from 'next/dynamic'

const NavbarDropdown = dynamic(() => import('./NavbarDropdown'))

interface Props {
  anchorEl: HTMLElement | null
  navigation: Navigation
}

const NavbarMobile = ({ anchorEl, navigation }: Props) => {
  const { active: dialogOpen, handleClick: handleOpenDialog } =
    useDropdown<boolean>()
  const { active: dropdownActive, handleClick: handleDropdownClick } =
    useDropdown()

  return (
    <div>
      <button onClick={() => handleOpenDialog(true)}>
        <HamburgerMenu height={24} width={24} />
      </button>
      <NavbarDropdown
        onClose={() => handleOpenDialog(false)}
        open={Boolean(dialogOpen)}
        anchorEl={anchorEl}
      >
        {/* <Link href={routes.app.login.href()} passHref>
          <Button slim Component="a" variant="ghost" className="w-full mb-2">
            Login
          </Button>
        </Link>
        <Link href={routes.app.signup.href()} passHref>
          <Button
            slim
            Component="a"
            color="brandPrimary"
            className="w-full mb-8"
          >
            Signup
          </Button>
        </Link> */}

        <div>
          {navigation.map(item => {
            const key = item.label
            if ('href' in item) {
              return (
                <Link href={item.href} key={key}>
                  <a className={cx(s.link, s.item)}>{item.label}</a>
                </Link>
              )
            } else {
              return (
                <div className={s.item} key={key}>
                  <button
                    className={s.link}
                    onClick={() => handleDropdownClick(item.label)}
                  >
                    {item.label}
                    <span
                      className={cx('ml-2 transition', {
                        'transform rotate-180': dropdownActive === item.label,
                      })}
                    >
                      <ChevronDown />
                    </span>
                  </button>
                  <Dropdown expanded={dropdownActive === item.label}>
                    {item.subNav.map(subItem => (
                      <Link href={subItem.href} key={subItem.label}>
                        <a className="block mb-2 text-lg text-secondary">
                          {subItem.label}
                        </a>
                      </Link>
                    ))}
                  </Dropdown>
                </div>
              )
            }
          })}
        </div>
      </NavbarDropdown>
    </div>
  )
}

const Dropdown = ({
  expanded,
  children,
}: {
  expanded: boolean
  children: React.ReactNode
}) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const scrollHeight = ref.current?.scrollHeight

  return (
    <div
      ref={ref}
      className="overflow-hidden transition-all duration-500"
      style={expanded ? { maxHeight: scrollHeight } : { maxHeight: 0 }}
    >
      <div className="mt-4">{children}</div>
    </div>
  )
}

export default NavbarMobile
