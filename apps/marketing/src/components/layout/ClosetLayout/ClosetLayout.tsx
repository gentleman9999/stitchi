import { gql, useQuery } from '@apollo/client'
import { Container } from '@components/ui'
import { ClosetLayoutGetDataQuery } from '@generated/ClosetLayoutGetDataQuery'
import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const ClosetLayout = (props: Props) => {
  const { data } = useQuery<ClosetLayoutGetDataQuery>(GET_DATA)

  const { user } = data?.viewer || {}

  return (
    <>
      <nav>
        <Container>
          <div className="flex justify-between items-center py-2">
            <div>
              <ul className="flex gap-8">
                {[
                  { href: routes.internal.closet.href(), label: 'Closet' },
                  { href: routes.internal.closet.href(), label: 'Designs' },
                  {
                    href: routes.internal.closet.orders.href(),
                    label: 'Orders',
                  },
                ].map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="underline text-lg font-semibold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-2">
              {user?.picture ? (
                <img
                  src={user.picture}
                  alt={user?.nickname || 'Avatar'}
                  className="w-8 h-8 rounded-md border"
                />
              ) : null}
              <span className="capitalize font-medium text-lg">
                {user?.nickname}
              </span>
            </div>
          </div>
        </Container>
      </nav>
      {props.children}
    </>
  )
}

const GET_DATA = gql`
  query ClosetLayoutGetDataQuery {
    viewer {
      id
      user {
        id
        nickname
        picture
      }
    }
  }
`

export default ClosetLayout
