import React from 'react'
import { useFuzzySearch, UseFuzzySearchHook } from 'hooks'

type Option = {
  id: string
  name: string
  value: string
  checked: HTMLInputElement['checked']
  [key: string]: any
}

interface Props {
  initialOptions: Option[]
}

interface UseCheckBoxGroupdHook {
  options: readonly Option[]
  search: UseFuzzySearchHook['search']
  term: UseFuzzySearchHook['term']
  setSelected(options: Option[]): void
}

const useCheckboxGroup = (props: Props): UseCheckBoxGroupdHook => {
  const { term, search, result } = useFuzzySearch({
    data: props.initialOptions,
  })

  const [options, setOptions] = React.useState(props.initialOptions)

  //   React.useEffect(() => {
  //     if (props.initialOptions !== options) {
  //       setOptions(props.initialOptions)
  //     }
  //   }, [options, props.initialOptions])

  const setSelected: UseCheckBoxGroupdHook['setSelected'] = options => {
    console.log('OPTIONS', options)
    setOptions(options)
  }

  return {
    options: options.filter(option => result.some(res => res.id === option.id)),
    search,
    term,
    setSelected,
  }
}

export default useCheckboxGroup
