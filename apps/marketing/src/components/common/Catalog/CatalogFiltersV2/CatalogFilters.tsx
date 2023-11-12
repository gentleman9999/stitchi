import Container from '@components/ui/Container'
import React from 'react'
import useCatalogFilters from '../CatalogFilters/useCatalogFilters'
import useActiveFilters from '../useActiveFilters'
import Dropdown from './Dropdown'
import IconButton from '@components/ui/IconButton'
import { XMarkIcon } from '@heroicons/react/20/solid'

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
  const { availableFilters, setFilters } = useCatalogFilters({
    brandEntityId,
    categoryEntityId,
  })
  const activeFilters = useActiveFilters()

  const { brands, categories, collections, fabrics, fits } = activeFilters

  return (
    <>
      {/* Spacer */}
      <div className="h-4" />

      <Container className="max-w-none">
        <nav className="p-2">
          <div className="flex items-center gap-4">
            <Dropdown
              label="Brands"
              //   label={`Brands ${brands?.length ? `(${brands.length})` : ''}`}
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
              label="Collections"
              items={availableFilters.collections.map(collection => ({
                id: collection.entityId,
                label: collection.name,
                active: Boolean(collections?.includes(collection.entityId)),
                onClick: () =>
                  setFilters(prev => ({
                    ...prev,
                    collections: prev.collections?.includes(collection.entityId)
                      ? prev.collections.filter(
                          id => id !== collection.entityId,
                        )
                      : [...(prev.collections || []), collection.entityId],
                  })),
              }))}
            />

            <Dropdown
              label="Fabrics"
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
              label="Fits"
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

          <div className="flex items-start gap-4 mt-4">
            {Object.keys(activeFilters).flatMap(key => {
              const activeFilterGroupKey = key as keyof typeof activeFilters
              const filterIds = activeFilters[activeFilterGroupKey]

              return filterIds?.map(id => {
                const foundFilter = availableFilters[activeFilterGroupKey].find(
                  item => ('id' in item ? item.id : item.entityId) === id,
                )

                if (foundFilter) {
                  return (
                    <div
                      key={id}
                      className="px-2 py-1 border bg-gray-100 rounded-md text-sm font-medium flex items-center justify-between"
                    >
                      <div>{foundFilter.name}</div>

                      <IconButton
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          setFilters(prev => ({
                            ...prev,
                            [activeFilterGroupKey]: prev[
                              activeFilterGroupKey
                            ]?.filter((filterId: number) => filterId !== id),
                          }))
                        }
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </IconButton>
                    </div>
                  )
                }
              })
            })}
          </div>
        </nav>
      </Container>
    </>
  )
}

export default CatalogFilters
