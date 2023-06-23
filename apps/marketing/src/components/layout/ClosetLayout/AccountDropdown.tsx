import routes from '@lib/routes'
import { ArrowPath, LockClosed } from 'icons'
import Link from 'next/link'
import React from 'react'
import * as Dropdown from '@radix-ui/react-dropdown-menu'
import { useRouter } from 'next/router'

interface Props {
  renderTrigger: () => React.ReactNode
}

const AccountDropdown = (props: Props) => {
  const router = useRouter()

  return (
    <Dropdown.Root>
      <Dropdown.Trigger>{props.renderTrigger()}</Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content
          side="bottom"
          sideOffset={6}
          align="end"
          className="p-2 rounded-md bg-white shadow-magical min-w-[200px] flex flex-col"
        >
          <Item
            href={routes.internal.account.setup.href({
              redirectUrl: router.asPath,
            })}
            icon={<ArrowPath className="w-4 h-4" />}
          >
            Switch closet
          </Item>
          <Item
            href={routes.internal.logout.href()}
            icon={<LockClosed className="w-4 h-4" />}
          >
            Logout
          </Item>
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  )
}

const Item = ({
  children,
  href,
  icon,
}: {
  children: React.ReactNode
  href: string
  icon: React.ReactNode
}) => {
  return (
    <Dropdown.Item asChild>
      <Link
        href={href}
        className="font-medium hover:bg-gray-100 py-1 px-2 rounded-md flex-1 flex items-center gap-2 justify-between"
      >
        {children}
        {icon}
      </Link>
    </Dropdown.Item>
  )
}

export default AccountDropdown
