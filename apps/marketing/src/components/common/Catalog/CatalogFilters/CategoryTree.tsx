import React from 'react'
import cx from 'classnames'
import CheckboxFilter from './CheckboxFilter'
import { Button } from '@components/ui'

interface Category {
  entityId: number
  name: string
  children?: Category[]
}

interface Props {
  categories: Category[]
  activeCategoryIds: number[] | null
  onToggle: (id: number) => void
}

const CategoryTree = (props: Props) => {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const [expanded, setExpanded] = React.useState(false)

  const featuredCategories = props.categories.slice(0, 4)
  const remainingCategories = props.categories.slice(4)

  const toggleExpanded = () => {
    setExpanded(!expanded)

    if (expanded) {
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <>
      <div className="sm:columns-2 gap-8">
        {featuredCategories?.map(category => (
          <div key={category.entityId} className="inline-block w-full mb-8">
            <Category
              category={category}
              activeCategoryIds={props.activeCategoryIds}
              onToggle={props.onToggle}
            />
          </div>
        ))}
      </div>
      {remainingCategories.length > 0 ? (
        <>
          <div
            className={cx(
              'grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-h-[2000px] transition-all duration-500 h-auto overflow-hidden',
              {
                '!max-h-0': !expanded,
              },
            )}
          >
            <div className="sm:columns-2 gap-8">
              {remainingCategories?.map(category => (
                <div
                  key={category.entityId}
                  className="inline-block w-full mb-8"
                >
                  <Category
                    category={category}
                    activeCategoryIds={props.activeCategoryIds}
                    onToggle={props.onToggle}
                  />
                </div>
              ))}
            </div>
          </div>
          <Button variant="naked" onClick={toggleExpanded}>
            {expanded ? 'Show less' : 'Show all'}
          </Button>
        </>
      ) : null}
    </>
  )
}

const Category = ({
  category,
  activeCategoryIds,
  onToggle,
}: {
  category: Category
  activeCategoryIds: number[] | null
  onToggle: (i: number) => void
}) => {
  const active = Boolean(activeCategoryIds?.includes(category.entityId))
  return (
    <div key={category.entityId} className="flex flex-col gap-4">
      <CheckboxFilter
        value={category.entityId}
        label={category.name}
        onChange={() => onToggle(category.entityId)}
        active={active}
        sectionName="Categories"
      />
      {active &&
        category.children?.map(child => (
          <div className="ml-6 flex flex-col gap-4" key={child.entityId}>
            <Category
              category={child}
              activeCategoryIds={activeCategoryIds}
              onToggle={onToggle}
            />
          </div>
        ))}
    </div>
  )
}

export default CategoryTree
