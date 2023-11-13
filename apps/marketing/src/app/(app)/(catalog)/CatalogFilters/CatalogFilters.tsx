'use client'

import Container from '@components/ui/Container'
import React from 'react'
import useCatalogFilters from './useCatalogFilters'
import useActiveFilters from '../useActiveFilters'
import Dropdown from './Dropdown'
import ActiveFiltersPreview from './ActiveFiltersPreview'
import SortButton from './SortButton'
import SearchInput from './SearchInput'
import useSearch from '../useSearch'
import cx from 'classnames'
import FeaturedFilters from './FeaturedFilters'
import Button from '@components/ui/ButtonV2/Button'
import FilterDialog from './FilterDialog'
import { Adjustments } from 'icons'

interface Props {
  brandEntityId?: number
  categoryEntityId?: number
}

const CatalogFilters = ({ brandEntityId, categoryEntityId }: Props) => {
  const [showFilterDialog, setShowFilterDialog] = React.useState(false)
  const [transitionStickyNav, setTransitionStickyNav] = React.useState(false)

  const { availableFilters, setFilters } = useCatalogFilters({
    brandEntityId,
    categoryEntityId,
  })

  const filterRef = React.useRef<HTMLDivElement>(null)

  const activeFilters = useActiveFilters()

  const { setSearch } = useSearch()

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

  const { brands, categories, collections, fabrics, fits } = activeFilters

  return (
    <>
      {/* Spacer */}
      <div className="h-4" />
      <div
        ref={filterRef}
        className={cx(`z-20 sticky top-topbar-height bg-paper`, {
          'shadow-magical': transitionStickyNav,
        })}
      >
        <Container className="max-w-none">
          <nav className="py-2 flex flex-col gap-2">
            <div className="lg:hidden flex gap-4 justify-between items-stretch">
              <Button
                className="flex-1"
                variant="ghost"
                onClick={() => setShowFilterDialog(prev => !prev)}
              >
                <div className="flex items-center gap-1">
                  <Adjustments
                    className="block h-4 w-4 rotate-90"
                    aria-hidden="true"
                  />
                  Filter
                </div>
              </Button>
              <div className="flex-1 flex">
                <SortButton />
              </div>
            </div>
            <div className="hidden lg:flex gap-8 justify-between items-stretch">
              <div className="flex gap-4">
                <SearchInput onSubmit={setSearch} />
                <Dropdown
                  multiple
                  label={makeFilterLabel('Our brands', brands?.length)}
                  items={availableFilters.brands.map(brand => ({
                    id: brand.id,
                    label: brand.name,
                    active: Boolean(brands?.includes(brand.id)),
                    onClick: () =>
                      setFilters(prev => ({
                        ...prev,
                        brands: prev.brands?.includes(brand.id)
                          ? prev.brands.filter(id => id !== brand.id)
                          : [...(prev.brands || []), brand.id],
                      })),
                  }))}
                />

                <Dropdown
                  multiple
                  label={makeFilterLabel('Collection', collections?.length)}
                  items={availableFilters.collections.map(collection => ({
                    id: collection.entityId,
                    label: collection.name,
                    active: Boolean(collections?.includes(collection.entityId)),
                    onClick: () =>
                      setFilters(prev => ({
                        ...prev,
                        collections: prev.collections?.includes(
                          collection.entityId,
                        )
                          ? prev.collections.filter(
                              id => id !== collection.entityId,
                            )
                          : [...(prev.collections || []), collection.entityId],
                      })),
                  }))}
                />

                <Dropdown
                  multiple
                  label={makeFilterLabel('Fabric', fabrics?.length)}
                  items={availableFilters.fabrics.map(fabric => ({
                    id: fabric.entityId,
                    label: fabric.name,
                    active: Boolean(fabrics?.includes(fabric.entityId)),
                    onClick: () =>
                      setFilters(prev => ({
                        ...prev,
                        fabrics: prev.fabrics?.includes(fabric.entityId)
                          ? prev.fabrics.filter(id => id !== fabric.entityId)
                          : [...(prev.fabrics || []), fabric.entityId],
                      })),
                  }))}
                />

                <Dropdown
                  multiple
                  label={makeFilterLabel('Fit', fits?.length)}
                  items={availableFilters.fits.map(fit => ({
                    id: fit.entityId,
                    label: fit.name,
                    active: Boolean(fits?.includes(fit.entityId)),
                    onClick: () =>
                      setFilters(prev => ({
                        ...prev,
                        fits: prev.fits?.includes(fit.entityId)
                          ? prev.fits.filter(id => id !== fit.entityId)
                          : [...(prev.fits || []), fit.entityId],
                      })),
                  }))}
                />
              </div>
              <div className="flex">
                <SortButton />
              </div>
            </div>

            <ActiveFiltersPreview
              brandEntityId={brandEntityId}
              categoryEntityId={categoryEntityId}
            />
          </nav>
        </Container>
      </div>

      <Container className="max-w-none mt-4 z-0">
        {!brandEntityId && !categoryEntityId ? <FeaturedFilters /> : null}
      </Container>

      <FilterDialog
        open={showFilterDialog}
        onClose={() => setShowFilterDialog(false)}
        scroll={true}
        brandEntityId={brandEntityId}
        categoryEntityId={categoryEntityId}
      />
    </>
  )
}

const makeFilterLabel = (label: string, count?: number) => {
  return `${label} ${count ? `(${count})` : ''}`
}

export default CatalogFilters
