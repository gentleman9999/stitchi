import useLocalStorage from '@hooks/useLocalStorage'
import { track } from '@lib/analytics'
import React from 'react'

interface State {
  productEntityIds: number[]
  toggleProduct: (args: { entityId: number; productName: string }) => void
  isProductInWishlist: (args: { entityId: number }) => boolean
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

  const toggleProduct: State['toggleProduct'] = ({ entityId, productName }) => {
    if (productEntityIds.indexOf(entityId) < 0) {
      track.productFavorited({ name: productName })
      setProductUuids([...productEntityIds, entityId])
    } else {
      setProductUuids(productEntityIds.filter(uuid => uuid !== entityId))
    }
  }

  const isProductInWishlist: State['isProductInWishlist'] = ({ entityId }) => {
    return productEntityIds.indexOf(entityId) >= 0
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
