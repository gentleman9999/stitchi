import { ArrowPath } from 'icons'
import React from 'react'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { gql, useQuery } from '@apollo/client'
import { OrganizationDropdownGetDataQuery } from '@generated/OrganizationDropdownGetDataQuery'
import useSetUserMembership from '@hooks/useSetUserMembership'

interface Props {
  renderTrigger: () => React.ReactNode
}

const OrganizationDropdown = (props: Props) => {
  const [setMembership] = useSetUserMembership()
  const { data } = useQuery<OrganizationDropdownGetDataQuery>(GET_DATA)

  const handleOrganizationClick = async (
    organizationId: string,
    membershipId: string,
  ) => {
    await setMembership({ membershipId, organizationId })
    window.location.reload()
  }

  return (
    <Dropdown.Root>
      <Dropdown.Trigger className="outline-none">
        {props.renderTrigger()}
      </Dropdown.Trigger>
      {/* <Dropdown.Portal> */}
      <Dropdown.Content
        side="bottom"
        sideOffset={6}
        align="end"
        className="p-2 rounded-md bg-white shadow-lg flex flex-col w-[var(--radix-dropdown-menu-trigger-width)]"
      >
        {data?.userMemberships?.map(membership => {
          const { organization } = membership

          return organization ? (
            <Item
              key={membership.id}
              onClick={() =>
                handleOrganizationClick(organization.id, membership.id)
              }
            >
              {organization.name}
            </Item>
          ) : null
        })}
      </Dropdown.Content>
      {/* </Dropdown.Portal> */}
    </Dropdown.Root>
  )
}

const Item = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick: () => void
}) => {
  return (
    <Dropdown.Item asChild>
      <button
        onClick={onClick}
        className=" hover:bg-gray-50 py-1 px-2 rounded-md flex-1 flex items-center gap-2 outline-none"
      >
        <div className="w-5 h-5 bg-gray-100 rounded-sm" />
        {children}
      </button>
    </Dropdown.Item>
  )
}

const GET_DATA = gql`
  query OrganizationDropdownGetDataQuery {
    userMemberships {
      id
      organization {
        id
        name
      }
    }
  }
`

export default OrganizationDropdown
