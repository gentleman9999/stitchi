import { useRouter } from 'next/router'
import React from 'react'
import { Dialog } from 'ui'

interface StandoutContext {}

const StandoutContext = React.createContext<StandoutContext | undefined>(
  undefined,
)

const StandoutProvider = ({ children }: { children: React.ReactNode }) => {
  const { query } = useRouter()

  const Standout = React.useCallback(() => {
    if (!query.standout) {
      return null
    }
    switch (query.standout) {
      case 'contact_success':
        return (
          <Dialog>
            <Dialog.Title>Hello</Dialog.Title>
          </Dialog>
        )
      default:
        return null
    }
  }, [query.standout])

  return (
    <StandoutContext.Provider value={undefined}>
      <Standout />
      {children}
    </StandoutContext.Provider>
  )
}

export default StandoutProvider
