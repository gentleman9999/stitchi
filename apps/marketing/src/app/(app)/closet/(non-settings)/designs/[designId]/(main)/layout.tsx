import { DesignProvider } from './design-context'
import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'

interface Props {
  children: React.ReactNode
  header: React.ReactNode
  slideover: React.ReactNode
}

const Layout = ({ children, header, slideover }: Props) => {
  return (
    <>
      {slideover}

      <DesignProvider>
        <ClosetPageContainer>
          {header}

          <ClosetSection>
            <ClosetSectionHeader />
            <div className="m-auto">{children}</div>
          </ClosetSection>
        </ClosetPageContainer>
      </DesignProvider>
    </>
  )
}

export default Layout
