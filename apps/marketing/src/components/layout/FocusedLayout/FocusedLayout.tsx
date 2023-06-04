import { Container, Logo } from '@components/ui'
import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const FocusedLayout = ({ children }: Props) => {
  React.useEffect(() => {
    // Because we have a sticky nav, we want to ensure that "scroll-to-top" is offset by the height of the nav

    if (typeof window === 'undefined') {
      return
    }

    const classList = ['scroll-pt-14', 'scroll-smooth']

    window.document.documentElement.classList.add(...classList)

    return () => {
      window.document.documentElement.classList.remove(...classList)
    }
  }, [])

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-white border-b py-2 z-40">
        <Container>
          <Link href={routes.internal.home.href()}>
            <Logo className="h-10" />
          </Link>
        </Container>
      </div>
      <div className="h-14" />
      {children}
    </>
  )
}

export default FocusedLayout
