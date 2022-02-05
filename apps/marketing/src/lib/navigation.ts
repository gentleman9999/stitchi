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
        href: '',
      },
      {
        label: 'Quality Customizations',
        description:
          "We'll design your merch for you, and you'll get paid for it.",
        icon: Support,

        href: '',
      },
      {
        label: 'eCommerce, Warehousing & Distribution',
        description:
          "We'll design your merch for you, and you'll get paid for it.",
        icon: Support,
        href: '',
      },
    ],
    resources: [
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
      {
        label: 'About us',
        icon: Support,
        href: '#',
      },
      {
        label: 'Partners',
        icon: Support,
        href: '#',
      },
      {
        label: 'Jobs',
        icon: Support,
        href: '#',
      },
    ],
    legal: [
      { label: 'Claim', href: '#' },
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
    ],
    social: [
      {
        label: 'Facebook',
        href: '#',
        icon: Facebook,
      },
      {
        label: 'Instagram',
        href: '#',
        icon: Instagram,
      },
      {
        label: 'Twitter',
        href: '#',
        icon: Twitter,
      },
    ],
  }),
}

export default navigation
