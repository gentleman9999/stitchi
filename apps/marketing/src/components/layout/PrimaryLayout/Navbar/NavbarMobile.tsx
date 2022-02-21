import { HamburgerMenu } from 'icons'
import React, { Fragment } from 'react'
import Link from 'next/link'
import s from './NavbarMobile.module.css'
import { Navigation } from '@lib/navigation'
import dynamic from 'next/dynamic'
import routes from '@lib/routes'
import { Button, IconButton } from 'ui'
import { Popover, Transition } from '@headlessui/react'

const NavbarDropdown = dynamic(() => import('./NavbarDropdown'))

interface Props {
  anchorEl: HTMLElement | null
  navigation: Navigation
}

const NavbarMobile = ({ anchorEl, navigation }: Props) => {
  const [dims, setDims] = React.useState<DOMRect | null>(null)

  React.useEffect(() => {
    const update = () => {
      if (anchorEl) {
        setDims(anchorEl.getBoundingClientRect())
      }
    }

    update()

    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('resize', update)
    }
  }, [anchorEl])

  if (!dims) {
    return null
  }

  return (
    <Popover>
      <Popover.Button>
        <span className="sr-only">Close menu</span>
        <IconButton>
          <HamburgerMenu height={24} width={24} />
        </IconButton>
      </Popover.Button>

      <Popover.Group as="nav" className="flex space-x-10">
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="fixed z-10"
            style={{
              left: dims.left,
              width: dims.width,
              top: dims.top + dims.height,
            }}
          >
            <NavbarDropdown>
              <div className={s.item}>
                <Link href={routes.internal.blog.href()} passHref>
                  <Popover.Button as="a" className={s.link}>
                    Learn
                  </Popover.Button>
                </Link>
              </div>
              <div className={s.item}>
                <Link
                  href={routes.internal.customers.morningBrew.href()}
                  passHref
                >
                  <Popover.Button as="a" className={s.link}>
                    Case Study
                  </Popover.Button>
                </Link>
              </div>
              <div className={s.item}>
                <Link href={routes.internal.getStarted.href()} passHref>
                  <Popover.Button
                    as={(props: any) => (
                      <Button
                        {...props}
                        bold
                        shadow
                        Component="a"
                        color="brandPrimary"
                        className="w-full"
                      />
                    )}
                  >
                    Talk to us
                  </Popover.Button>
                </Link>
              </div>
            </NavbarDropdown>
          </Popover.Panel>
        </Transition>
      </Popover.Group>
    </Popover>
  )
}

export default NavbarMobile
