import { useUser } from '@auth0/nextjs-auth0/client'
import Button from '@components/ui/Button'
import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'

const s = {
  link: 'inline-flex items-center leading-6 transition ease-in-out duration-75 cursor-pointer text-gray-900 font-extrabold lowercase text-lg',
}

interface Props {
  anchorEl: HTMLElement | null
}

const DesktopNavigation = ({ anchorEl }: Props) => {
  const { user } = useUser()
  return (
    <nav className="flex flex-1">
      <div>
        {!user ? (
          <Link href={routes.internal.login.href()} className={s.link}>
            Login
          </Link>
        ) : null}

        <Button
          bold
          slim
          Component={Link}
          color="primary"
          className="!border-2 !py-1 !px-2 !border-gray-800 !lowercase"
          variant="ghost"
          href={
            user ? routes.internal.closet.href() : routes.internal.signup.href()
          }
        >
          {user ? 'My closet' : 'Get started'}
        </Button>
      </div>
    </nav>
  )
}

export default DesktopNavigation
