import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import React from 'react'
import cx from 'classnames'
import { motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
}

const Carousel = ({ children }: Props) => {
  const scrollContainer = React.useRef<HTMLDivElement>(null)
  const [hasPrev, setHasPrev] = React.useState(false)
  const [hasNext, setHasNext] = React.useState(true)

  React.useEffect(() => {
    const currentScrollContainer = scrollContainer.current

    if (!currentScrollContainer) {
      return
    }

    const onScroll = () => {
      setHasPrev(currentScrollContainer.scrollLeft > 0)
      setHasNext(
        currentScrollContainer.scrollWidth >
          currentScrollContainer.scrollLeft +
            currentScrollContainer.offsetWidth,
      )
    }

    currentScrollContainer.addEventListener('scroll', onScroll)

    onScroll()

    return () => currentScrollContainer.removeEventListener('scroll', onScroll)
  }, [])

  const handleScroll =
    (direction: 'left' | 'right') =>
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()
      e.stopPropagation()

      if (!scrollContainer.current) {
        return
      }

      const scrollAmount = 300
      const scrollLeft = scrollContainer.current.scrollLeft

      if (direction === 'left') {
        scrollContainer.current.scrollLeft = Math.max(
          scrollLeft - scrollAmount,
          0,
        )
      } else {
        scrollContainer.current.scrollLeft = Math.min(
          scrollLeft + scrollAmount,
          scrollContainer.current.scrollWidth,
        )
      }
    }

  return (
    <div className="flex relative">
      <motion.div
        className={cx('absolute left-4 top-[50%] bottom-[50%] pr-2', {
          hidden: !hasPrev,
        })}
      >
        <button
          className="rounded-full text-gray-900 bg-gray-50 p-2 drop-shadow-md border "
          onClick={handleScroll('left')}
        >
          <ChevronLeftIcon className="w-5 h-5 font-bold" />
        </button>
      </motion.div>
      <div ref={scrollContainer} className="flex-1 overflow-x-scroll">
        {children}
      </div>
      <motion.div
        className={cx(
          'absolute right-4 top-[50%] bottom-[50%] z-10 flex flex-col justify-center items-center pl-2',
          { hidden: !hasNext },
        )}
      >
        <button
          className="rounded-full text-gray-900 bg-gray-50 p-2 drop-shadow-md border "
          onClick={handleScroll('right')}
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  )
}

export default Carousel
