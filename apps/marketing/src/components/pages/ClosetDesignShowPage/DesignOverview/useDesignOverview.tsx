import React from 'react'

const useDesignOverview = () => {
  const [activeColorId, setActiveColorId] = React.useState<string | null>(null)

  return {
    activeColorId,
    setActiveColorId,
  }
}

export default useDesignOverview
