import { XIcon } from 'icons'
import React, { Suspense } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import FilterDialogContainer from './FilterDialogContainer'
import IconButton from '@components/ui/IconButton'
import { SearchProductsFiltersInput } from '@generated/types'
import { SetValues, UseQueryStatesKeysMap } from 'nuqs'
import { QueryStates } from '../CatalogProductsListPage'
import FilterDialogInner from './FilterDialogInner'
import DialogSectionPadding from './DialogSectionPadding'
import Divider from './Divider'
import Skeleton from 'react-loading-skeleton'
import { motion } from 'framer-motion'

interface Props {
  open: boolean
  onClose: () => void
  setFilters: SetValues<UseQueryStatesKeysMap<Omit<QueryStates, 'after'>>>
  defaultBrandEntityId: number | null
  defaultPreviewFilters: SearchProductsFiltersInput
  rootCategoryEntityId: number
}

const FilterDialog = ({
  open,
  onClose,
  defaultBrandEntityId,
  setFilters,
  defaultPreviewFilters,
  rootCategoryEntityId,
}: Props) => {
  const handleSubmit = (filters: SearchProductsFiltersInput) => {
    setFilters(filters)
    onClose()
  }

  return (
    <FilterDialogContainer open={open} onClose={onClose}>
      <DialogSectionPadding>
        <Dialog.Title
          className="text-lg leading-6 font-medium text-gray-900"
          asChild
        >
          <div className="grid grid-cols-3">
            <div>
              <Dialog.Close asChild>
                <IconButton variant="ghost" disableGutters>
                  <XIcon width={20} height={20} />
                </IconButton>
              </Dialog.Close>
            </div>

            <div className="text-center font-heading font-bold flex items-center justify-center">
              Filters
            </div>
            <div />
          </div>
        </Dialog.Title>
      </DialogSectionPadding>

      <Divider className="mt-4 sm:mt-6" />

      <motion.div
        initial={{
          height: 0,
        }}
        animate={{
          height: 'auto',
        }}
        exit={{
          height: 0,
        }}
        transition={{
          type: 'spring',
          bounce: 0,
          duration: 0.3,
          delay: 0,
        }}
      >
        <Suspense
          fallback={
            <DialogSectionPadding>
              <div className="flex flex-col gap-10">
                {Array.from(new Array(3)).map((_, i) => (
                  <div key={i}>
                    <legend className="text-2xl font-semibold text-gray-800 font-heading">
                      <Skeleton enableAnimation width={50} />
                    </legend>
                    <span>
                      <Skeleton enableAnimation inline width="70%" />
                    </span>
                    <div className="mt-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {Array.from(new Array(4)).map((_, i) => (
                          <div key={i}>
                            <Skeleton enableAnimation width="50%" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </DialogSectionPadding>
          }
        >
          <FilterDialogInner
            rootCategoryEntityId={rootCategoryEntityId}
            defaultBrandEntityId={defaultBrandEntityId}
            defaultPreviewFilters={defaultPreviewFilters}
            onSubmit={handleSubmit}
          />
        </Suspense>
      </motion.div>
      <DialogSectionPadding />
    </FilterDialogContainer>
  )
}

export default FilterDialog
