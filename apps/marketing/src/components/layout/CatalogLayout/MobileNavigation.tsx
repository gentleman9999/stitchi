import { HamburgerMenu } from 'icons'
import React from 'react'
import Popover from '../Popover'
import { Popover as HeadlessPopover } from '@headlessui/react'
import routes from '@lib/routes'
import { useUser } from '@auth0/nextjs-auth0/client'
import Button from '@components/ui/ButtonV2/Button'
import Link from 'next/link'

const s = {
  item: 'py-4 border-b border-gray-200 border-solid last:border-b-0',
  link: 'text-xl font-bold flex items-center justify-between w-full',
}

interface Props {
  anchorEl: HTMLElement | null
}

const MobileNavigation = ({ anchorEl }: Props) => {
  const { user } = useUser()
  return (
    <Popover
      anchorEl={anchorEl}
      ButtonChildren={() => <HamburgerMenu height={24} width={24} />}
      panelChildren={
        <>
          <div className={s.item}>
            <Link href={routes.internal.catalog.href()}>
              <HeadlessPopover.Button className={s.link}>
                Catalog
              </HeadlessPopover.Button>
            </Link>
          </div>

          {!user ? (
            <div className={s.item}>
              <Link
                href={routes.internal.login.href({
                  returnTo: routes.internal.closet.href(),
                })}
              >
                <HeadlessPopover.Button className={s.link}>
                  Login
                </HeadlessPopover.Button>
              </Link>
            </div>
          ) : null}

          <div className={s.item}>
            <Link
              href={
                user
                  ? routes.internal.getStarted.href()
                  : routes.internal.signup.href()
              }
            >
              <HeadlessPopover.Button as="div">
                <Button bold shadow color="brandPrimary" className="w-full">
                  {user ? 'My closet' : 'Get started'}
                </Button>
              </HeadlessPopover.Button>
            </Link>
          </div>
        </>
      }
    />
  )
}

export default MobileNavigation
