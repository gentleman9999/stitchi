import React from 'react'
import NavbarRoot from '../NavbarRoot'
import PageloadProgressIndicator from '../PageloadProgressIndicator'
import DesktopNavigation from './DesktopNavigation'
import MobileNavigation from './MobileNavigation'
import SupportWidget from './SupportWidget'

interface Props {
  children: React.ReactNode
}

const CatalogLayout = ({ children }: Props) => {
  const [dropdownAchor, setDropdownAnchor] =
    React.useState<HTMLDivElement | null>(null)

  return (
    <>
      <PageloadProgressIndicator />
      <SupportWidget />
      <div className={'flex flex-col justify-between min-h-screen'}>
        {/* Floating nav spacer */}
        <div className={`h-[111px]`} />
        {/* End - Floating nav spacer */}
        <NavbarRoot innerRef={setDropdownAnchor}>
          <div
            ref={setDropdownAnchor}
            className="flex items-center flex-1 justify-end"
          >
            <div className="block lg:hidden">
              <MobileNavigation anchorEl={dropdownAchor} />
              {/* <NavbarMobile anchorEl={dropdownAchor} navigation={nav} /> */}
            </div>
            <div className="hidden lg:block">
              <DesktopNavigation anchorEl={dropdownAchor} />
              {/* <NavbarDesktop anchorEl={dropdownAchor} navigation={nav} /> */}
            </div>
          </div>
        </NavbarRoot>
        <main className="mb-auto relative overflow-x-hidden">{children}</main>
      </div>
    </>
  )
}

export default CatalogLayout
