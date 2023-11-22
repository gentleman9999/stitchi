import {
  Apron,
  Backpack,
  BaseBallCap,
  Hoodie,
  Pants,
  Recycle,
  Socks,
  TShirt,
  USAFlag,
} from 'icons'
import React, { useEffect } from 'react'
import cx from 'classnames'
import styles from './FeaturedFilters.module.css'
import { useFilters } from '../filters-context'

const featured = [
  {
    categoryEntityId: 25,
    label: 'T-Shirts',
    Icon: TShirt,
  },
  {
    categoryEntityId: 30,
    label: 'Sweatshirts',
    Icon: Hoodie,
  },
  {
    categoryEntityId: 29,
    label: 'Hats',
    Icon: BaseBallCap,
  },
  {
    categoryEntityId: 426,
    label: 'Bags',
    Icon: Backpack,
  },
  {
    categoryEntityId: 202,
    label: 'Bottoms',
    Icon: Pants,
  },
  {
    categoryEntityId: 441,
    label: 'Socks',
    Icon: Socks,
  },
  {
    categoryEntityId: 33,
    label: 'Accessories',
    Icon: Apron,
  },
  {
    categoryEntityId: 474,
    label: 'USA Made',
    Icon: USAFlag,
  },
  {
    categoryEntityId: 475,
    label: 'Sustainable',
    Icon: Recycle,
  },
]

const FeaturedFilters = () => {
  const {
    filters: { categories },
    setFilters,
    toggleFilter,
  } = useFilters()

  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const [showLeftArrow, setShowLeftArrow] = React.useState(false)
  const [showRightArrow, setShowRightArrow] = React.useState(false)

  const checkScroll = () => {
    if (!scrollContainerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current

    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  useEffect(() => {
    checkScroll()
  }, [])

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    let { scrollLeft } = scrollContainerRef.current

    if (direction === 'left') {
      scrollContainerRef.current.scrollTo({
        left: scrollLeft - 100,
        behavior: 'smooth',
      })
    } else {
      scrollContainerRef.current.scrollTo({
        left: scrollLeft + 100,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="relative">
      <ScrollButton
        direction="left"
        onClick={() => handleScroll('left')}
        visible={showLeftArrow}
      >
        ←
      </ScrollButton>

      <ScrollButton
        direction="right"
        onClick={() => handleScroll('right')}
        visible={showRightArrow}
      >
        →
      </ScrollButton>

      <div
        className={styles.container}
        ref={scrollContainerRef}
        onScroll={checkScroll}
      >
        <div className="gap-12 hidden sm:flex">
          {featured.map(featured => {
            const active = Boolean(
              categories?.find(c => c.entityId === featured.categoryEntityId),
            )

            return (
              <button
                key={featured.categoryEntityId}
                onClick={() =>
                  toggleFilter('categories', featured.categoryEntityId)
                }
                className={cx(
                  'relative flex flex-col gap-2 text-xs font-medium items-center justify-between min-w-[60px]shrink-0 pb-3',
                  'after:content=[""] after:absolute after:bottom-0 after:w-full after:h-0.5 after:bg-transparent after:hover:bg-gray-300',
                  'fill-gray-600 hover:fill-gray-800 text-gray-600 hover:text-gray-800',
                  { 'after:!bg-gray-900 text-gray-900': active },
                )}
              >
                <div>
                  <featured.Icon width={25} height={25} />
                </div>
                <div className="whitespace-nowrap">{featured.label}</div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const ScrollButton = ({
  onClick,
  children,
  visible,
  direction,
}: {
  visible: boolean
  direction: 'left' | 'right'
  children: React.ReactNode
  onClick: () => void
}) => {
  return (
    <div
      className={cx(
        'z-0 p-3 bg-gradient-to-r  opacity-0 transition-all absolute',
        {
          'opacity-100 !z-10': visible,
          'from-white to-transparent from-70% pr-5 left-0':
            direction === 'left',
          'from-transparent to-white to-30% pl-5 right-0':
            direction === 'right',
        },
      )}
    >
      <button
        onClick={onClick}
        className={cx(
          'w-8 h-8 border rounded-full flex items-center justify-center font-medium',
        )}
      >
        {children}
      </button>
    </div>
  )
}

export default FeaturedFilters
