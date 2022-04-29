import useLocalStorage from '@hooks/useLocalStorage'
import React from 'react'

interface State {
  productEntityIds: number[]
  toggleProduct: (productEntityId: number) => void
  isProductInWishlist: (productEntityId: number) => boolean
}

const WishlistContext = React.createContext<State | undefined>(undefined)

interface WishlistProviderProps {}

const WishlistProvider = ({
  children,
}: React.PropsWithChildren<WishlistProviderProps>) => {
  const [productEntityIds, setProductUuids] = useLocalStorage<number[]>(
    'stitchi__wishlist',
    [],
  )

  const toggleProduct = (productEntityId: number) => {
    if (productEntityIds.indexOf(productEntityId) < 0) {
      setProductUuids([...productEntityIds, productEntityId])
    } else {
      setProductUuids(productEntityIds.filter(uuid => uuid !== productEntityId))
    }
  }

  const isProductInWishlist = (productEntityId: number) => {
    return productEntityIds.indexOf(productEntityId) >= 0
  }

  return (
    <WishlistContext.Provider
      value={{ productEntityIds, toggleProduct, isProductInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

const useWishlist = () => {
  const context = React.useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}

export { WishlistProvider, useWishlist }
