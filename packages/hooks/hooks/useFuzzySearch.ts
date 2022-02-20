import { useState } from 'react'
import Fuse from 'fuse.js'

function fuzzySearch<T>({
  fuse,
  data,
  term,
}: {
  fuse: Fuse<T>
  data: readonly T[]
  term: string
}) {
  const result = fuse.search(`${term}`)

  return term ? result.map(r => r.item) : data
}

export interface UseFuzzySearchProps<T> {
  data: readonly T[]
  options?: Fuse.IFuseOptions<T>
}

/**
 * A custom React Hook to do a in-memory fuzzy text search
 * using Fuse.js.
 */
function useFuzzySearch<T>({ data, options }: UseFuzzySearchProps<T>) {
  const [term, setTerm] = useState('')

  const fuseOptions = {
    threshold: 0.2,
    keys: Object.keys(data[0]).filter(key => key !== 'id'),
    ...options,
  }

  const fuse = new Fuse(data, fuseOptions)

  const result = fuzzySearch({ data, term, fuse })

  const reset = () => setTerm('')

  return { result, search: setTerm, term, reset }
}

export type UseFuzzySearchHook = ReturnType<typeof useFuzzySearch>

export default useFuzzySearch
