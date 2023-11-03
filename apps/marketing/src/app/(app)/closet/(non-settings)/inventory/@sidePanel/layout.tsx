import ClosetSection from '@components/common/ClosetSection'
import { Card } from '@components/ui/Card'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <ClosetSection>
      <Card className="@2xl:shadow-2xl">{children}</Card>
    </ClosetSection>
  )
}

export default Layout
