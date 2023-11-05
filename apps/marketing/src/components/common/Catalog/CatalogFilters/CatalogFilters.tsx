import React from 'react'
import FilterDialog from './FilterDialog'
import FilterDialogButton from './FilterDialogButton'
import useIntersectionObserver from '@components/hooks/useIntersectionObserver'
import FeaturedFilters from './FeaturedFilters'
import { track } from '@lib/analytics'
import cx from 'classnames'
import Container from '@components/ui/Container'
import Transition from '@components/ui/Transition'

interface Props {
  catalogEndRef: React.RefObject<any>
  brandEntityId?: number
  categoryEntityId?: number
}

const CatalogFilters = ({
  catalogEndRef,
  brandEntityId,
  categoryEntityId,
}: Props) => {
  const [transitionStickyNav, setTransitionStickyNav] = React.useState(false)
  const filterRef = React.useRef<HTMLDivElement>(null)
  const staticFilterRef = React.useRef<HTMLDivElement>(null)
  const staticFilter = useIntersectionObserver(staticFilterRef, {})
  const catalogEnd = useIntersectionObserver(catalogEndRef, {})
  const [dialogOpen, setDialogOpen] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      const { y } = filterRef.current?.getBoundingClientRect() || {}

      if (y && y < 57) {
        setTransitionStickyNav(true)
      } else {
        setTransitionStickyNav(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleFilterClick = (expanded: boolean) => {
    track.catalogFilterClicked()
    setDialogOpen(expanded)
  }

  const Button = ({ floating = false }) => (
    <FilterDialogButton onClick={handleFilterClick} floating={floating} />
  )

  const showFloatingFilter =
    Boolean(staticFilter) &&
    !staticFilter?.isIntersecting &&
    !catalogEnd?.isIntersecting

  return (
    <>
      {/* Spacer */}
      <div className="h-4" />

      <div
        ref={filterRef}
        className={cx(`z-10 sticky top-topbar-height bg-paper`, {
          'shadow-magical': transitionStickyNav,
        })}
      >
        <Container className="max-w-none">
          <nav className="pt-2">
            <Transition.Root show={showFloatingFilter}>
              <Transition.FadeOpacity>
                <div className="fixed z-10 bottom-11 left-0 right-0 flex justify-center">
                  <div className="drop-shadow-md">
                    <Button floating={true} />
                  </div>
                </div>
              </Transition.FadeOpacity>
            </Transition.Root>

            <FilterDialog
              open={dialogOpen}
              onClose={() => setDialogOpen(false)}
              scroll={!staticFilter?.isIntersecting}
              brandEntityId={brandEntityId}
              categoryEntityId={categoryEntityId}
            />

            <div className="flex justify-between items-center gap-4">
              <div className="flex-1 overflow-hidden">
                {!brandEntityId && !categoryEntityId ? (
                  <FeaturedFilters />
                ) : null}
              </div>

              <div className="h-10 mb-2" ref={staticFilterRef}>
                <Button />
              </div>
            </div>
          </nav>
        </Container>
      </div>
    </>
  )
}

export default CatalogFilters
