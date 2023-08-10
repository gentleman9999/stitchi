import React from 'react'
import FilterDialog from './FilterDialog'
import FilterDialogButton from './FilterDialogButton'
import useIntersectionObserver from '@components/hooks/useIntersectionObserver'
import { Transition } from '@components/ui'
import FeaturedFilters from './FeaturedFilters'
import { track } from '@lib/analytics'

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
  const staticFilterRef = React.useRef<HTMLDivElement>(null)
  const staticFilter = useIntersectionObserver(staticFilterRef, {})
  const catalogEnd = useIntersectionObserver(catalogEndRef, {})
  const [dialogOpen, setDialogOpen] = React.useState(false)

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
    <nav>
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
          {!brandEntityId && !categoryEntityId ? <FeaturedFilters /> : null}
        </div>

        <div className="h-10" ref={staticFilterRef}>
          <Button />
        </div>
      </div>
    </nav>
  )
}

export default CatalogFilters
