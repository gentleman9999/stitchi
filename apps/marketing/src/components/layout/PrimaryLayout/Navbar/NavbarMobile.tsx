import { ChevronDown, HamburgerMenu } from 'icons'
import React from 'react'
import Link from 'next/link'
import cx from 'classnames'
import s from './NavbarMobile.module.css'
import { Navigation } from '@lib/navigation'
import useDropdown from './useDropdown'
import dynamic from 'next/dynamic'
import routes from '@lib/routes'
import { Button } from 'ui'

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

  const solutionsLabel = 'Why Stitchi?'
  const resourcesLabel = 'Resources'

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
        <div className={s.item}>
          <Link href={routes.internal.blog.href()} passHref>
            <a className={s.link}>Learn</a>
          </Link>
        </div>
        <div className={s.item}>
          <Link href={routes.internal.customers.morningBrew.href()} passHref>
            <a className={s.link}>Case study</a>
          </Link>
        </div>
        <div className={s.item}>
          <Link href={routes.internal.getStarted.href()} passHref>
            <Button
              shadow
              Component="a"
              color="brandPrimary"
              className="w-full"
            >
              Talk to us
            </Button>
          </Link>
        </div>

        {/* <div>
          <div className={s.item} key={solutionsLabel}>
            <button
              className={s.link}
              onClick={() => handleDropdownClick(solutionsLabel)}
            >
              {solutionsLabel}
              <span
                className={cx('ml-2 transition', {
                  'transform rotate-180': dropdownActive === solutionsLabel,
                })}
              >
                <ChevronDown />
              </span>
            </button>
            <Dropdown expanded={dropdownActive === solutionsLabel}>
              {navigation.solutions.map(subItem => (
                <Link href={subItem.href} key={subItem.label}>
                  <a className="block mb-2 text-lg text-secondary">
                    {subItem.label}
                  </a>
                </Link>
              ))}
            </Dropdown>
          </div>
          <div className={s.item} key={resourcesLabel}>
            <button
              className={s.link}
              onClick={() => handleDropdownClick(resourcesLabel)}
            >
              {resourcesLabel}
              <span
                className={cx('ml-2 transition', {
                  'transform rotate-180': dropdownActive === resourcesLabel,
                })}
              >
                <ChevronDown />
              </span>
            </button>
            <Dropdown expanded={dropdownActive === resourcesLabel}>
              {navigation.resources.map(subItem => (
                <Link href={subItem.href} key={subItem.label}>
                  <a className="block mb-2 text-lg text-secondary">
                    {subItem.label}
                  </a>
                </Link>
              ))}
            </Dropdown>
          </div>
        </div> */}
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
