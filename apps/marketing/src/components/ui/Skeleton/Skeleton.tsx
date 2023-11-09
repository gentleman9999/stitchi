import React from 'react'
import ReactLoadingSkeleton, {
  SkeletonProps as ReactLoadingSkeletonProps,
} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { theme } from '../../../../tailwind.config'

export interface SkeletonProps extends ReactLoadingSkeletonProps {}

const Skeleton = (props: SkeletonProps) => {
  return <ReactLoadingSkeleton baseColor={theme.colors.gray[50]} {...props} />
}

export default Skeleton
