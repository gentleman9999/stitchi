'use client'

import React from 'react'
import { useInView } from 'react-intersection-observer'

interface Props {
  onIntersect: () => void
}

export default function InfiniteScrollTrigger(props: Props) {
  const { inView, ref } = useInView()

  React.useEffect(() => {
    if (!inView) return

    props.onIntersect()
  }, [inView, props])

  return <div ref={ref} />
}
