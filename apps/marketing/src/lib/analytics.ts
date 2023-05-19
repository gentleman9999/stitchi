import mixpanel from 'mixpanel-browser'

enum MixpanelEvents {
  NAVBAR_CTA_CLICKED = 'Navbar CTA Clicked',

  PRODUCT_FAVORITED = 'Product Favorited',
  PRODUCT_PRIMARY_CTA_CLICKED = 'Product Primary CTA Clicked',
  PRODUCT_CUSTOM_DESIGN_CLICKED = 'Product Custom Design Clicked',

  CATALOG_FILTER_CLICKED = 'Catalog Filter Clicked',

  MAILING_LIST_SUBSCRIBE_CLICKED = 'Mailing List Subscribe Clicked',

  CONTACT_FORM_SUBMITTED = 'Contact Form Submitted',
}

interface Product {
  name: string
}

interface TrackEvents {
  navbarCtaCliced: (args: { view: 'mobile' | 'desktop' }) => void

  productFavorited: (product: Product) => void
  productPrimaryCtaClicked: (product: Product) => void
  productCustomDesignClicked: (product: Product) => void

  catalogFilterClicked: () => void

  mailingListSubscribeClicked: (args: { email: string }) => void

  contactFormSubmitted: (args: { email: string }) => void
}

const track: TrackEvents = {
  navbarCtaCliced: ({ view }) => {
    mixpanel.track(MixpanelEvents.NAVBAR_CTA_CLICKED, {
      view,
    })
  },

  productFavorited: product => {
    mixpanel.track(MixpanelEvents.PRODUCT_FAVORITED, { product })
  },
  productPrimaryCtaClicked: product => {
    mixpanel.track(MixpanelEvents.PRODUCT_PRIMARY_CTA_CLICKED, { product })
  },
  productCustomDesignClicked: product => {
    mixpanel.track(MixpanelEvents.PRODUCT_CUSTOM_DESIGN_CLICKED, { product })
  },

  catalogFilterClicked: () => {
    mixpanel.track(MixpanelEvents.CATALOG_FILTER_CLICKED)
  },

  mailingListSubscribeClicked: ({ email, ...rest }) => {
    mixpanel.track(MixpanelEvents.MAILING_LIST_SUBSCRIBE_CLICKED, {
      email,
      ...rest,
    })
  },

  contactFormSubmitted: ({ email, ...rest }) => {
    mixpanel.track(MixpanelEvents.CONTACT_FORM_SUBMITTED, { email, ...rest })
  },
}

export { track }