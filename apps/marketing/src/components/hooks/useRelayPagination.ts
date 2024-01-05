import { queryTypes, useQueryState, useQueryStates } from 'nuqs'

const useRelayPagination = ({ limit }: { limit?: number } = {}) => {
  const [{ cursor, direction }, setPagination] = useQueryStates({
    direction: queryTypes.stringEnum(['after', 'before']),
    cursor: queryTypes.string,
  })

  return {
    after: direction === 'after' ? cursor : undefined,
    before: direction === 'before' ? cursor : undefined,
    first: direction === 'after' || direction === null ? limit : undefined,
    last: direction === 'before' ? limit : undefined,
    handleNextPage: (endCursor: string) => {
      setPagination({ direction: 'after', cursor: endCursor })
    },
    handlePreviousPage: (startCursor: string) => {
      setPagination({ direction: 'before', cursor: startCursor })
    },
  }
}

export default useRelayPagination
