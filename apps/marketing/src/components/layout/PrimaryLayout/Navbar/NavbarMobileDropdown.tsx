import { Menu, Transition } from '@headlessui/react'
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
              'mb-4': open,
            })}
          >
            <ButtonChildren active={open} />
          </Menu.Button>

          <Menu.Items unmount={false} className="flex flex-col gap-4">
            {items.map((Component, i) => (
              <Menu.Item key={i}>
                <div>
                  <Component />
                </div>
              </Menu.Item>
            ))}
          </Menu.Items>
        </>
      )}
    </Menu>
  )
}

export default NavbarMobileDropdown
