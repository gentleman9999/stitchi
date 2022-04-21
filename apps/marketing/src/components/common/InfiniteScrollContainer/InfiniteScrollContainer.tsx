import useIntersectionObserver from '@hooks/useIntersectionObserver'
import React from 'react'

export interface InfiniteScrollContainerProps {
  children: React.ReactNode
  onLoadMore: () => void
}

const InfiniteScrollContainer = ({
  children,
  onLoadMore,
}: InfiniteScrollContainerProps) => {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const entry = useIntersectionObserver(ref, {})
  const isVisible = !!entry?.isIntersecting

  React.useEffect(() => {
    if (isVisible) {
      onLoadMore()
    }
  }, [isVisible, onLoadMore])

  return (
    <>
      {children}
      <div ref={ref} />
    </>
  )
}

export default InfiniteScrollContainer
