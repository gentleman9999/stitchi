import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import { Container } from 'ui'
import s from './NavbarRoot.module.css'
import { throttle } from 'lodash-es'

interface Props {
  children: React.ReactNode
  innerRef: React.RefObject<HTMLDivElement> | React.RefCallback<HTMLDivElement>
}

const NavbarRoot = ({ children, innerRef }: Props) => {
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

  return (
    <div className={s.root}>
      <Container
        ref={innerRef}
        className={cx(s.inner, { 'shadow-magical': hasScrolled })}
      >
        {children}
      </Container>
    </div>
  )
}

NavbarRoot.displayName = 'NavbarRoot'

export default NavbarRoot
