import {
  Facebook,
  Instagram,
  SentimentSatisfied,
  Support,
  Twitter,
} from 'icons'
import { routes } from '.'

export type Navigation = ReturnType<typeof navigation.makeNavigation>

const navigation = {
  makeNavigation: () => ({
    solutions: [
      {
        label: 'Pro Merch Design (free)',
        description:
          "We'll design your merch for you, and you'll get all the credit.",
        icon: Support,
        href: routes.internal.features.design.href(),
      },

      {
        label: 'eCommerce, Warehousing & Distribution',
        description:
          "Infinitely and efficiently scale your merch program using Stitchi's distribution center. ",
        icon: Support,
        href: routes.internal.features.distribution.href(),
      },
      {
        label: 'Swag Bags & Boxes',
        description:
          'Curate unique branded promotional products for your fans and employees.',
        icon: Support,
        href: '',
        beta: true,
      },
      {
        label: 'Loyalty & Referral Programs',
        description:
          'Reward your audience for purchasing from you or referring your brand.',
        icon: Support,
        href: '',
        beta: true,
      },
    ],
    resources: [
      // {
      //   label: 'Partners',
      //   icon: SentimentSatisfied,
      //   href: routes.internal.partners.href(),
      // },
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
