import ClosetPageTitle from '@components/common/ClosetPageTitle'
import Skeleton from '@components/ui/Skeleton'
import React from 'react'
import { theme } from '../../../../../../../../../tailwind.config'

const Loading = () => {
  return (
    <ClosetPageTitle
      title={
        <Skeleton height={30} width={400} baseColor={theme.colors.gray[100]} />
      }
      description={
        <Skeleton height={20} width={200} baseColor={theme.colors.gray[100]} />
      }
    />
  )
}

export default Loading
