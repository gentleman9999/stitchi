import { Menu } from '@headlessui/react'
import React from 'react'
import cx from 'classnames'

interface Props {
  ButtonChildren: React.ComponentType<{ active: boolean }>
  items: React.ComponentType<{ props?: any }>[]
}

const NavbarMobileDropdown = ({ ButtonChildren, items }: Props) => {
  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button
            className={cx('w-full', {
              'mb-3': open,
            })}
          >
            <ButtonChildren active={open} />
          </Menu.Button>
          <Menu.Items
            unmount={false}
            style={
              {
                // maxHeight: open ? `${ref.current?.scrollHeight}px` : `0`,
              }
            }
          >
            {items.map((Component, i) => (
              <Menu.Item key={i}>
                <Component />
              </Menu.Item>
            ))}
          </Menu.Items>
        </>
      )}
    </Menu>
  )
}

export default NavbarMobileDropdown
