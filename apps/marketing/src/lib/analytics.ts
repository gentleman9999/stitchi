import mixpanel from 'mixpanel-browser'

enum MixpanelEvents {
  NAVBAR_CTA_CLICKED = 'Navbar CTA Clicked',

  PRODUCT_FAVORITED = 'Product Favorited',
  PRODUCT_PRIMARY_CTA_CLICKED = 'Product Primary CTA Clicked',

  SIGNUP_CTA_CLICKED = 'Signup CTA Clicked',

  CATALOG_FILTER_CLICKED = 'Catalog Filter Clicked',

  MAILING_LIST_SUBSCRIBE_CLICKED = 'Mailing List Subscribe Clicked',

  CONTACT_FORM_SUBMITTED = 'Contact Form Submitted',

  ERROR_SHOWN = 'Error Shown',

  SUPPORT_CHAT_OPENED = 'Support Chat Opened',
}

interface Product {
  name: string
  productId: string
}

interface TrackEvents {
  productFavorited: (product: Product) => void
  productPrimaryCtaClicked: (product: Product) => void

  catalogFilterClicked: () => void

  mailingListSubscribeClicked: (args: { email: string }) => void

  contactFormSubmitted: (args: { email: string }) => void

  errorShown: (args: { error: Error | string }) => void

  supportChatOpened: (args: { locationHref: string }) => void

  signupCtaClicked: (args: {
    locationHref: string
    ctaType: 'product' | 'navigation' | 'hero' | null
  }) => void
}

const track: TrackEvents = {
  productFavorited: product => {
    mixpanel.track(MixpanelEvents.PRODUCT_FAVORITED, { product })
  },
  productPrimaryCtaClicked: product => {
    mixpanel.track(MixpanelEvents.PRODUCT_PRIMARY_CTA_CLICKED, { product })
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

  errorShown: ({ error }) => {
    mixpanel.track(MixpanelEvents.ERROR_SHOWN, { error })
  },

  supportChatOpened: ({ locationHref }) => {
    mixpanel.track(MixpanelEvents.SUPPORT_CHAT_OPENED, { locationHref })
  },

  signupCtaClicked: ({ locationHref, ctaType }) => {
    mixpanel.track(MixpanelEvents.SIGNUP_CTA_CLICKED, {
      locationHref,
      ctaType,
    })
  },
}

export { track }
