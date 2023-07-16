import { createContext, useContext, useState } from 'react'

interface State {
  saving: boolean
  setSaving: (saving: boolean) => void
}

const DesignContext = createContext<State | undefined>(undefined)

interface Props {
  children: React.ReactNode
}

const DesignProvider = ({ children }: Props) => {
  const [saving, setSaving] = useState(false)

  return (
    <DesignContext.Provider value={{ saving, setSaving }}>
      {children}
    </DesignContext.Provider>
  )
}

const useDesignContext = () => {
  const context = useContext(DesignContext)

  if (context === undefined) {
    throw new Error('useDesignContext must be used within a DesignProvider')
  }

  return context
}

export { DesignProvider, useDesignContext }
