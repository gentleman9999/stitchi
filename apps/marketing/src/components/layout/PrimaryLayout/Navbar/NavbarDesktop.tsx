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
  const iconBaseProps = { fill: 'var(--primary)' }

  return (
    <nav className="space-x-10">
      <Link href={routes.internal.blog.href()} passHref>
        <a className={s.link}>Learn</a>
      </Link>
      <Link href={routes.internal.customers.morningBrew.href()} passHref>
        <a className={s.link}>Case study</a>
      </Link>

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
