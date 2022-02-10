import { ChevronDown } from 'icons'
import dynamic from 'next/dynamic'
import React from 'react'
import cx from 'classnames'
import Link from 'next/link'
import useDropdown from './useDropdown'
import routes from '@lib/routes'
import { Navigation } from '@lib/navigation'
import { Button } from 'ui'
import s from './NavbarDesktop.module.css'

// const NavbarDropdown = dynamic(() => import('./NavbarDropdown'))
// const NavbarDropdownItemDesktop = dynamic(() => import('./NavbarItemDesktop'))

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

  const solutionsLabel = 'Why Stitchi?'
  const resourcesLabel = 'Resources'
  const iconBaseProps = { fill: 'var(--tertiary)' }

  return (
    <nav className="space-x-10">
      <Link href={routes.internal.blog.href()} passHref>
        <a className={s.link}>Learn</a>
      </Link>
      <Link href={routes.internal.customers.morningBrew.href()} passHref>
        <a className={s.link}>Case study</a>
      </Link>
      {/* <div className="inline-flex" key={solutionsLabel}> */}
      {/* <DropdownButton
          label={solutionsLabel}
          onClick={e => {
            handleClick(solutionsLabel)
          }}
          expanded={active === solutionsLabel}
        />

        <NavbarDropdown
          onClose={() => handleClick(solutionsLabel)}
          open={active === solutionsLabel}
          anchorEl={anchorEl}
        >
          <div className="grid grid-cols-3 gap-4">
            {navigation.solutions.map(subItem => (
              <NavbarDropdownItemDesktop
                key={subItem.label}
                label={subItem.label}
                href={subItem.href}
                description={subItem.description}
                icon={<subItem.icon {...iconBaseProps} />}
              />
            ))}
          </div>
        </NavbarDropdown>
      </div>

      <div className="inline-flex" key={resourcesLabel}>
        <DropdownButton
          label={resourcesLabel}
          onClick={e => {
            handleClick(resourcesLabel)
          }}
          expanded={active === resourcesLabel}
        />

        <NavbarDropdown
          onClose={() => handleClick(resourcesLabel)}
          open={active === resourcesLabel}
          anchorEl={anchorEl}
        >
          <div className="grid grid-cols-3 gap-4">
            {navigation.resources.map(subItem => (
              <NavbarDropdownItemDesktop
                key={subItem.label}
                label={subItem.label}
                href={subItem.href}
                icon={<subItem.icon {...iconBaseProps} />}
              />
            ))}
          </div>
        </NavbarDropdown>
      </div> */}

      <Link href={routes.internal.getStarted.href()} passHref>
        <Button
          Component="a"
          className="!py-1 !px-4 !font-extrabold !lowercase"
          color="brandPrimary"
        >
          start here
        </Button>
      </Link>
    </nav>
  )
}

export default NavbarDesktop
