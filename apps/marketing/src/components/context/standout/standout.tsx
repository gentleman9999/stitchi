import { useRouter } from 'next/router'
import React from 'react'
import dynamic from 'next/dynamic'

const ContactSuccessDialog = dynamic(() => import('./ContactSuccessDialog'))

interface StandoutContext {}

const StandoutContext = React.createContext<StandoutContext | undefined>(
  undefined,
)

const StandoutProvider = ({ children }: { children: React.ReactNode }) => {
  const { query } = useRouter()

  return (
    <StandoutContext.Provider value={undefined}>
      <Standout standout={query.standout} />
      {children}
    </StandoutContext.Provider>
  )
}

const Standout = ({
  standout,
}: {
  standout: string | string[] | undefined
}) => {
  const { query } = useRouter()

  if (!standout) {
    return null
  }
  switch (standout) {
    case 'contact_success':
      return <ContactSuccessDialog email={query.email?.toString()} />
    default:
      return null
  }
}

export { StandoutProvider }
