import React from 'react'
import { useInView } from 'react-intersection-observer'

interface Props {
  onIntersect: () => void
}

const InfiniteScrollTrigger = (props: Props) => {
  const { inView, ref } = useInView()

  React.useEffect(() => {
    if (!inView) return

    console.log('TRIGGERRRR')

    props.onIntersect()
  }, [inView, props])

  return <div ref={ref} />
}

export default InfiniteScrollTrigger
