import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import s from './NavbarRoot.module.css'
import { throttle } from 'lodash-es'
import Link from 'next/link'
import routes from '@lib/routes'
import Container from '@components/ui/Container'
import Logo from '@components/ui/Logo'

interface Props {
  children: React.ReactNode
  innerRef: React.RefObject<HTMLDivElement> | React.RefCallback<HTMLDivElement>
}

const NavbarRoot = ({ children, innerRef }: Props) => {
  const [shrink, setShrink] = React.useState(false)

  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = throttle(() => {
      const offset = 0
      const { scrollTop } = document.documentElement
      const scrolled = scrollTop > offset

      if (hasScrolled !== scrolled) {
        setHasScrolled(scrolled)
      }
    }, 200)

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [hasScrolled])

  useEffect(() => {
    let prevScrollPos = 0

    const handleScroll = () => {
      if (window.scrollY > prevScrollPos + 10) {
        setShrink(true)
        prevScrollPos = window.scrollY
      } else if (window.scrollY < prevScrollPos - 5) {
        setShrink(false)
        prevScrollPos = window.scrollY
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={cx(s.root)}>
      <Container ref={innerRef} className={cx(s.inner)}>
        <div className={cx(s.nav)}>
          <Link
            href={routes.internal.home.href()}
            passHref
            className="contents"
          >
            <Logo className={s.logo} />
          </Link>
          {children}
        </div>
      </Container>
    </div>
  )
}

NavbarRoot.displayName = 'NavbarRoot'

export default NavbarRoot
