import mixpanel from 'mixpanel-browser'

enum MixpanelEvents {
  PRODUCT_FAVORITED = 'Product Favorited',
  PRODUCT_PRIMARY_CTA_CLICKED = 'Product Primary CTA Clicked',
  PRODUCT_CUSTOM_DESIGN_CLICKED = 'Product Custom Design Clicked',
}

interface Product {
  name: string
}

interface TrackEvents {
  productFavorited: (product: Product) => void
  productPrimaryCtaClicked: (product: Product) => void
  productCustomDesignClicked: (product: Product) => void
}

const track: TrackEvents = {
  productFavorited: product => {
    mixpanel.track(MixpanelEvents.PRODUCT_FAVORITED, { product })
  },
  productPrimaryCtaClicked: product => {
    mixpanel.track(MixpanelEvents.PRODUCT_PRIMARY_CTA_CLICKED, { product })
  },
  productCustomDesignClicked: product => {
    mixpanel.track(MixpanelEvents.PRODUCT_CUSTOM_DESIGN_CLICKED, { product })
  },
}

export { track }
