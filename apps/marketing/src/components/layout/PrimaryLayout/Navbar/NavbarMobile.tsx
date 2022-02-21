import { HamburgerMenu } from 'icons'
import React from 'react'
import Link from 'next/link'
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

  return (
    <div>
      <button className="p-2" onClick={() => handleOpenDialog(true)}>
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
              bold
              shadow
              Component="a"
              color="brandPrimary"
              className="w-full"
            >
              Talk to us
            </Button>
          </Link>
        </div>
      </NavbarDropdown>
    </div>
  )
}

export default NavbarMobile
