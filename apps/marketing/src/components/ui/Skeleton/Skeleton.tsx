import React from 'react'
import ReactLoadingSkeleton, {
  SkeletonProps as ReactLoadingSkeletonProps,
} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export interface SkeletonProps extends ReactLoadingSkeletonProps {}

const Skeleton = (props: SkeletonProps) => {
  return <ReactLoadingSkeleton {...props} baseColor="#f8f8f8" />
}

export default Skeleton
