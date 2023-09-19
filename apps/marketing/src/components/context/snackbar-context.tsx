import dynamic from 'next/dynamic'
import React, { useState } from 'react'

import type { ToastProps } from '@components/ui/Toast'

const Toast = dynamic(() => import('@components/ui/Toast'), { ssr: false })

interface Snackbar {
  id: number
  title?: ToastProps['title']
  description?: ToastProps['description']
  severity?: ToastProps['severity']
}

interface State {
  enqueueSnackbar: (params: Omit<Snackbar, 'id'>) => void
  closeSnackbar: (id: number) => void
}

const SnackbarContext = React.createContext<State | undefined>(undefined)

interface SnackbarProviderProps {
  children: React.ReactNode
}

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [snackbars, setSnackbars] = useState<Snackbar[]>([])

  const enqueueSnackbar = React.useCallback<State['enqueueSnackbar']>(
    params => {
      // Create a unique id for the snackbar
      const id = new Date().getTime() + Math.random()

      // If more than 3 snackbars, remove the oldest one

      setSnackbars(prevSnackbars => [...prevSnackbars, { ...params, id }])
    },
    [],
  )

  const closeSnackbar = (id: number) => {
    setSnackbars(prevSnackbars =>
      prevSnackbars.filter(snackbar => snackbar.id !== id),
    )
  }

  const state = React.useMemo(() => {
    return {
      enqueueSnackbar,
      closeSnackbar,
    }
  }, [enqueueSnackbar])

  return (
    <SnackbarContext.Provider value={state}>
      {children}
      <div className="fixed right-6 bottom-6 flex flex-col gap-4 max-w-[390px] w-full list-none z-[2147483647] outline-none">
        {snackbars.slice(0, 3).map(snackbar => (
          <Toast
            {...snackbar}
            key={snackbar.id}
            open
            onOpenChange={() => closeSnackbar(snackbar.id)}
          />
        ))}
      </div>
    </SnackbarContext.Provider>
  )
}

export const useSnackbar = () => {
  const context = React.useContext(SnackbarContext)

  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider')
  }

  return context
}

export default SnackbarContext
