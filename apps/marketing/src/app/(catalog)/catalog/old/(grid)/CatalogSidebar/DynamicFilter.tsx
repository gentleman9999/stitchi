import { useFragment } from '@apollo/experimental-nextjs-app-support/ssr'
import { FiltersProvider } from '../filters-context'
import { FiltersProviderDynamicFilterFragment } from '@generated/types'
import FilterGroup from './FilterGroup'
import FilterItem from './FilterItem'
import { notEmpty } from '@lib/utils/typescript'

interface Props {
  name: string
}

const DynamicFilter = ({ name }: Props) => {
  const { data: filter } = useFragment<FiltersProviderDynamicFilterFragment>({
    fragment: FiltersProvider.fragments.dynamicFilter,
    fragmentName: 'FiltersProviderDynamicFilterFragment',
    from: {
      id: name,
      __typename: 'SearchProductFilter',
    },
  })

  console.log('FILTER DATA', filter)

  if (filter.__typename !== 'ProductAttributeSearchFilter') {
    return null
  }

  const attributes =
    filter.attributes?.edges?.map(a => a?.node).filter(notEmpty) || []

  return (
    <FilterGroup
      label={filter.filterName}
      showClear={Boolean(attributes.find(a => a.isSelected))}
      onClear={() => {}}
    >
      {attributes.map(attribute => (
        <FilterItem
          key={attribute.value}
          onClick={() => {}}
          label={attribute.value || ''}
          active={attribute.isSelected}
        />
      ))}
    </FilterGroup>
  )
}

export default DynamicFilter
