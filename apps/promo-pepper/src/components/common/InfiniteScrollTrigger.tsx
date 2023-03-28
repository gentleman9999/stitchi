'use client'

import { useIntersectionObserver } from '@/hooks'
import React from 'react'

interface Props {
  onIntersect: () => void
}

export default function InfiniteScrollTrigger(props: Props) {
  const directoryEndRef = React.useRef<HTMLDivElement>(null)
  const directoryEnd = useIntersectionObserver(directoryEndRef, {})

  React.useEffect(() => {
    if (!directoryEnd?.isIntersecting) return

    props.onIntersect()
  }, [directoryEnd?.isIntersecting, props])

  return <div ref={directoryEndRef} />
}
