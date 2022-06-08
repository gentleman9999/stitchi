import { ChevronDown, HamburgerMenu } from 'icons'
import React from 'react'
import Link from 'next/link'
import s from './NavbarMobile.module.css'
import { Navigation } from '@lib/navigation'
import routes from '@lib/routes'
import { Button } from '@components/ui'
import { useRouter } from 'next/router'
import cx from 'classnames'
import NavbarMobileDropdown from './NavbarMobileDropdown'
import Popover from './Popover'

interface Props {
  anchorEl: HTMLElement | null
  navigation: Navigation
}

const NavbarMobile = ({ anchorEl, navigation }: Props) => {
  const router = useRouter()
  const [dims, setDims] = React.useState<DOMRect | null>(null)

  React.useEffect(() => {
    const update = () => {
      if (anchorEl) {
        setDims(anchorEl.getBoundingClientRect())
      }
    }

    update()

    window.addEventListener('resize', update)
    router.events.on('routeChangeComplete', update)

    return () => {
      window.removeEventListener('resize', update)
      router.events.off('routeChangeComplete', update)
    }
  }, [anchorEl, router.events])

  return (
    <Popover
      anchorEl={anchorEl}
      ButtonChildren={() => <HamburgerMenu height={24} width={24} />}
      panelChildren={
        <>
          <div className={s.item}>
            <NavbarMobileDropdown
              ButtonChildren={({ active }) => (
                <div className={s.link}>
                  Services
                  <span
                    className={cx('ml-2 transition', {
                      'transform rotate-180': active,
                    })}
                  >
                    <ChevronDown />
                  </span>
                </div>
              )}
              items={navigation.solutions.map(item => {
                // https://headlessui.dev/react/menu#integrating-with-next-js
                // eslint-disable-next-line react/display-name
                return function (props: any) {
                  return (
                    <Link href={item.href} key={item.label}>
                      <a
                        {...props}
                        className="block mb-2 text-lg text-secondary"
                      >
                        {item.label}
                      </a>
                    </Link>
                  )
                }
              })}
            />
          </div>
          <div className={s.item}>
            <Link href={routes.internal.catalog.href()} passHref>
              <a className={s.link}>Catalog</a>
            </Link>
          </div>
          <div className={s.item}>
            <Link href={routes.internal.blog.href()} passHref>
              <a className={s.link}>Learn</a>
            </Link>
          </div>

          <div className={s.item}>
            <Link href={routes.internal.customers.morningBrew.href()} passHref>
              <a className={s.link}>Case Study</a>
            </Link>
          </div>
          <div className={s.item}>
            <Link href={routes.internal.getStarted.href()} passHref>
              <Button
                Component={(props: any) => (
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
              </Button>
            </Link>
          </div>
        </>
      }
    />
  )
}

export default NavbarMobile
