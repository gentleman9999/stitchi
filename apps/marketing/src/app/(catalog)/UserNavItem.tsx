'use client'

import routes from '@lib/routes'
import Link from 'next/link'
import cx from 'classnames'
import { track } from '@lib/analytics'
import { useUser } from '@auth0/nextjs-auth0/client'
import s from './layout.module.css'

const UserNavItem = () => {
  const { user } = useUser()

  return (
    <div className="flex gap-6">
      {!user ? (
        <Link href={routes.internal.login.href()} passHref className={s.link}>
          Login
        </Link>
      ) : null}
      <Link
        className={cx(
          s.link,
          'border !font-bold py-1 px-2 rounded-lg border-gray-950',
        )}
        href={
          user ? routes.internal.closet.href() : routes.internal.signup.href()
        }
        onClick={() => {
          track.navbarCtaCliced({ view: 'desktop' })
        }}
      >
        {user ? 'My closet' : 'Sign up for free'}
      </Link>
    </div>
  )
}

export default UserNavItem
