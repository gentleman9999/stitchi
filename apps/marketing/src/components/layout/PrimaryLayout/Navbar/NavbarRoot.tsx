import React from 'react'
import cx from 'classnames'
import s from './NavbarRoot.module.css'
import Link from 'next/link'
import routes from '@lib/routes'
import Container from '@components/ui/Container'
import Logo from '@components/ui/Logo'

interface Props {
  children: React.ReactNode
  innerRef?: React.RefObject<HTMLDivElement> | React.RefCallback<HTMLDivElement>
}

const NavbarRoot = ({ children, innerRef }: Props) => {
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
