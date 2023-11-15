'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

const NotificationSlideover = dynamic(
  () => import('./NotificationsSlideover'),
  {
    ssr: false,
  },
)

interface State {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const NotificationStandoutContext = React.createContext<State | undefined>(
  undefined,
)

const NotificationStandoutProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <NotificationStandoutContext.Provider
      value={{
        open,
        setOpen,
      }}
    >
      {open && <NotificationSlideover onClose={() => setOpen(false)} />}
      {children}
    </NotificationStandoutContext.Provider>
  )
}

const useNotificationStandout = () => {
  const context = React.useContext(NotificationStandoutContext)

  if (context === undefined) {
    throw new Error(
      'useNotificationStandout must be used within a NotificationStandoutProvider',
    )
  }

  return context
}

export { NotificationStandoutProvider, useNotificationStandout }
