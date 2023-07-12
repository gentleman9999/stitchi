import { gql, useQuery } from '@apollo/client'
import { Badge, Container } from '@components/ui'
import { ClosetLayoutGetDataQuery } from '@generated/ClosetLayoutGetDataQuery'
import { MembershipRole } from '@generated/globalTypes'
import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'
import AccountDropdown from './AccountDropdown'

interface Props {
  children: React.ReactNode
}

const ClosetLayout = (props: Props) => {
  const { data } = useQuery<ClosetLayoutGetDataQuery>(GET_DATA)

  const { user, role, organization } = data?.viewer || {}

  return (
    <>
      <nav>
        <Container>
          <div className="flex justify-between items-center py-2">
            <div>
              <ul className="flex gap-8">
                {[
                  { href: routes.internal.closet.href(), label: 'Closet' },
                  {
                    href: routes.internal.closet.orders.href(),
                    label: 'Orders',
                  },
                  {
                    href: '',
                    label: 'Brand Hub',
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
              {role === MembershipRole.STITCHI_DESIGNER ? (
                <Badge label="Designer" size="small" />
              ) : null}
              {organization?.name ? (
                <Badge label={organization.name} size="small" />
              ) : null}
              <AccountDropdown
                renderTrigger={() => (
                  <div className="hover:bg-gray-100 p-1 rounded-md">
                    {user?.picture ? (
                      <img
                        src={user.picture}
                        alt={user?.nickname || 'Avatar'}
                        className="w-8 h-8 rounded-md border"
                      />
                    ) : null}
                  </div>
                )}
              />
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
      role
      organization {
        id
        name
      }
      user {
        id
        nickname
        picture
      }
    }
  }
`

export default ClosetLayout
