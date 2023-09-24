import React from 'react'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { gql, useQuery } from '@apollo/client'
import { OrganizationDropdownGetDataQuery } from '@generated/OrganizationDropdownGetDataQuery'
import useSetUserMembership from '@components/hooks/useSetUserMembership'
import { PlusIcon } from '@heroicons/react/20/solid'
import { StandoutType, useStandout } from '@components/context'
import { motion } from 'framer-motion'
import { Badge } from '@components/ui'
import cx from 'classnames'

const fadeIn = {
  hidden: { opacity: 0.5, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { scale: 0.95 },
}

interface Props {
  renderTrigger: () => React.ReactNode
}

const OrganizationDropdown = (props: Props) => {
  const { setStandout } = useStandout()
  const [setMembership] = useSetUserMembership()
  const { data } = useQuery<OrganizationDropdownGetDataQuery>(GET_DATA)

  const handleOrganizationClick = async (
    organizationId: string,
    membershipId: string,
  ) => {
    await setMembership({ membershipId, organizationId })

    // Reload page to reset cache data
    window.location.reload()
  }

  return (
    <Dropdown.Root>
      <Dropdown.Trigger className="outline-none">
        {props.renderTrigger()}
      </Dropdown.Trigger>
      <Dropdown.Content side="bottom" sideOffset={6} align="end" asChild>
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={fadeIn}
          className="p-2 rounded-md bg-white shadow-lg flex flex-col border w-[var(--radix-dropdown-menu-trigger-width)]"
        >
          {data?.userMemberships?.map(membership => {
            const { organization } = membership

            return organization ? (
              <Item
                key={membership.id}
                active={membership.id === data?.viewer?.id}
                onClick={() =>
                  handleOrganizationClick(organization.id, membership.id)
                }
              >
                <div className="flex flex-col items-start">
                  {organization.name}
                  {membership.humanizedRole ? (
                    <Badge
                      size="small"
                      label={membership.humanizedRole}
                      className="!text-xs !py-0.5 !px-1.5"
                      // severity="info"
                    />
                  ) : null}
                </div>
              </Item>
            ) : null
          })}
          <hr className="my-2" />
          <Item
            onClick={() =>
              setStandout({ type: StandoutType.OrganizationCreate })
            }
            icon={
              <div className="w-5 h-5 bg-paper rounded-sm">
                <PlusIcon className="w-5 h-5" />
              </div>
            }
          >
            New account
          </Item>
        </motion.div>
      </Dropdown.Content>
    </Dropdown.Root>
  )
}

const Item = ({
  children,
  onClick,
  icon,
  active,
}: {
  children: React.ReactNode
  onClick: () => void
  icon?: React.ReactNode
  active?: boolean
}) => {
  return (
    <Dropdown.Item asChild>
      <button
        onClick={onClick}
        className={cx(
          'border-2 border-transparent hover:border-primary hover:bg-gray-50 transition-all py-2 px-2 rounded-md flex-1 flex items-center gap-2 outline-none text-sm font-medium',
          {
            '!border-gray-100 bg-gray-50 pointer-events-none': active,
          },
        )}
      >
        <div className="w-5 h-5 bg-gray-100 rounded-sm">{icon}</div>
        {children}
      </button>
    </Dropdown.Item>
  )
}

const GET_DATA = gql`
  query OrganizationDropdownGetDataQuery {
    viewer {
      id
    }
    userMemberships {
      id
      humanizedRole
      organization {
        id
        name
      }
    }
  }
`

export default OrganizationDropdown
