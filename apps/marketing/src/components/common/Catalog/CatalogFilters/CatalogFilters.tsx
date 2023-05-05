import React from 'react'
import FilterDialog from './FilterDialog'
import FilterDialogButton from './FilterDialogButton'
import useIntersectionObserver from '@hooks/useIntersectionObserver'
import { Transition } from '@components/ui'

interface Props {
  catalogEndRef: React.RefObject<any>
  hideBrands?: boolean
}

const CatalogFilters = ({ catalogEndRef, hideBrands }: Props) => {
  const staticFilterRef = React.useRef<HTMLDivElement>(null)
  const staticFilter = useIntersectionObserver(staticFilterRef, {})
  const catalogEnd = useIntersectionObserver(catalogEndRef, {})
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const Button = React.forwardRef<any, { floating?: boolean }>(
    ({ floating = false }, ref) => (
      <FilterDialogButton
        ref={ref}
        onClick={setDialogOpen}
        floating={floating}
      />
    ),
  )

  Button.displayName = 'Button'

  const showFloatingFilter = React.useMemo(
    () =>
      Boolean(staticFilter) &&
      !staticFilter?.isIntersecting &&
      !catalogEnd?.isIntersecting,
    [staticFilter, catalogEnd?.isIntersecting],
  )

  return (
    <nav>
      <Transition.Root show={showFloatingFilter}>
        <Transition.FadeOpacity>
          <Button floating={true} />
        </Transition.FadeOpacity>
      </Transition.Root>

      <FilterDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        scroll={!staticFilter?.isIntersecting}
        hideBrands={hideBrands}
      />

      <div className="flex justify-between">
        <div />
        <div ref={staticFilterRef}>
          <Button />
        </div>
      </div>
    </nav>
  )
}

export default CatalogFilters
