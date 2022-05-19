import { Facebook, Instagram, Support, Twitter } from 'icons'
import { routes } from '.'

export type Navigation = ReturnType<typeof navigation.makeNavigation>

const navigation = {
  makeNavigation: () => ({
    solutions: [
      {
        label: 'Pro Merch Designs (Free)',
        description:
          "We'll design your merch for you, and you'll get paid for it.",
        icon: Support,
        href: routes.internal.features.design.href(),
      },
      // {
      //   label: 'Quality Customizations',
      //   description:
      //     "We'll design your merch for you, and you'll get paid for it.",
      //   icon: Support,

      //   href: '',
      // },
      {
        label: 'eCommerce, Warehousing & Distribution',
        description:
          "We'll design your merch for you, and you'll get paid for it.",
        icon: Support,
        href: routes.internal.features.distribution.href(),
      },
    ],
    resources: [
      {
        label: 'Catalog',
        icon: Support,
        href: routes.internal.catalog.href(),
      },

      {
        label: 'Learn',
        icon: Support,
        href: routes.internal.blog.href(),
      },
      {
        label: 'Morning Brew Case Study',
        icon: Support,
        href: routes.internal.customers.morningBrew.href(),
      },
      // {
      //   label: 'About us',
      //   icon: Support,
      //   href: '#',
      // },
      // {
      //   label: 'Partners',
      //   icon: Support,
      //   href: '#',
      // },
      // {
      //   label: 'Jobs',
      //   icon: Support,
      //   href: '#',
      // },
    ],
    legal: [
      // { label: 'Claim', href: '#' },
      { label: 'Privacy', href: routes.internal.legal.privacy.href() },
      { label: 'Terms', href: routes.internal.legal.terms.href() },
    ],
    social: [
      // {
      //   label: 'Facebook',
      //   href: '#',
      //   icon: Facebook,
      // },
      // {
      //   label: 'Instagram',
      //   href: '#',
      //   icon: Instagram,
      // },
      {
        label: 'Twitter',
        href: routes.external.social.twitter.href(),
        icon: Twitter,
      },
    ],
  }),
}

export default navigation
