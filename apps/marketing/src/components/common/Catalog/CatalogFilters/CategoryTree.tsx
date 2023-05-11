import React from 'react'
import CheckboxFilter from './CheckboxFilter'

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
  return (
    <div className="sm:columns-2 gap-8">
      {props.categories?.map(category => (
        <div key={category.entityId} className="inline-block w-full mb-8">
          <Category
            category={category}
            activeCategoryIds={props.activeCategoryIds}
            onToggle={props.onToggle}
          />
        </div>
      ))}
    </div>
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
  return (
    <div key={category.entityId} className="flex flex-col gap-4">
      <CheckboxFilter
        value={category.entityId}
        label={category.name}
        onChange={() => onToggle(category.entityId)}
        active={Boolean(activeCategoryIds?.includes(category.entityId))}
        sectionName="Categories"
      />
      {category.children?.map(child => (
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
