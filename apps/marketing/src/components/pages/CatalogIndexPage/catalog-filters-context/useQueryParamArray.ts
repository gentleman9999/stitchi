import { useRouter } from 'next/router'

interface Props {
  param: string
}

const useQueryParamArray = ({ param }: Props) => {
  const { query, push } = useRouter()

  const parsedParam = stringToArray(query[param]?.toString())

  const handleChange = (value: string[]) => {
    push({
      query: {
        ...query,
        [param]: arrayToString(value),
      },
    })
  }

  const handleAddOrRemoveFromList = (value: string) => {
    if (parsedParam.includes(value)) {
      handleChange(parsedParam.filter(id => id !== value))
    } else {
      handleChange([...parsedParam, value])
    }
  }

  const handleClear = () => {
    const newQuery = { ...query }
    delete newQuery[param]
    push({
      query: newQuery,
    })
  }

  return {
    handleClear,
    handleToggle: handleAddOrRemoveFromList,
    value: parsedParam,
  }
}

const arrayToString = (array: string[]) => {
  return array.join(',')
}

const stringToArray = (string?: string) => {
  if (!string) return []
  try {
    return string.split(',')
  } catch {
    return []
  }
}

export default useQueryParamArray
