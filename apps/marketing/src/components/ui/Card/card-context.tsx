import React from 'react'

interface State {
  collapsed: boolean
  collapsable: boolean
  setCollapsed: (collapsed: boolean) => void
}

const CardContext = React.createContext<State | undefined>(undefined)

interface Props {
  children: React.ReactNode
  collapsable?: boolean
  defaultCollapsed?: boolean
}

const CardProvider = ({
  children,
  collapsable = false,
  defaultCollapsed = false,
}: Props) => {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed)

  const value = React.useMemo(
    () => ({ collapsed, collapsable, setCollapsed }),
    [collapsed, collapsable],
  )

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>
}

const useCardContext = () => {
  const context = React.useContext(CardContext)
  if (context === undefined) {
    throw new Error('useCardContext must be used within a CardProvider')
  }
  return context
}

export { CardProvider, useCardContext }
