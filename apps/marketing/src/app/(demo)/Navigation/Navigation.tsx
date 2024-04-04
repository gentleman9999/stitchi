import React from 'react'
import Link from 'next/link'
import routes from '@lib/routes'
import Logo from '@components/ui/Logo'
import Container from '@components/ui/Container'
import cx from 'classnames'
import AppTopbarUser from 'app/AppTopbarUser'

interface Props {}

const Navigation = ({}: Props) => {
  return (
    <>
      <TopBarContainer>
        <div className="flex-1 flex flex-row justify-between items-center gap-4">
          <Link
            href={routes.internal.home.href()}
            passHref
            className="contents"
          >
            <Logo className="h-[30px]" />
          </Link>

          <div className="flex-1 flex flex-row gap-4">
            <div className="w-full max-w-[300px] h-[40px] border rounded-md" />
          </div>
        </div>

        <AppTopbarUser />
      </TopBarContainer>
      <BottomBarContainer>Bottom bar</BottomBarContainer>
    </>
  )
}

const TopBarContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cx('h-[56px] transition-all border-b')}>
      <Container className="max-w-none flex items-center h-full">
        <nav className={'flex-1 flex'}>{children}</nav>
      </Container>
    </div>
  )
}

const BottomBarContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="sticky top-0 h-[43px] border-b z-40">{children}</div>
}

export default Navigation
