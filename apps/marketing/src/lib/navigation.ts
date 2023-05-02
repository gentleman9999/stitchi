import { Support, Twitter } from 'icons'
import { routes } from '.'

export type Navigation = ReturnType<typeof navigation.makeNavigation>

const navigation = {
  makeNavigation: () => ({
    services: [
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
          'Infinitely and efficiently scale your merch program using our distribution centers. ',
        icon: Support,
        href: routes.internal.features.distribution.href(),
      },
    ],
    solutions: [
      {
        label: 'Loyalty & Referral Programs',
        description:
          'Incentivize your customers with rewards for purchases and brand referrals.',
        icon: Support,
        href: routes.internal.solutions.loyaltyPrograms.href(),
      },
      {
        label: 'Swag Bags & Boxes',
        description:
          'Create unique branded branded experiences to showcase your brand.',
        icon: Support,
        href: '#',
        beta: true,
      },
      {
        label: 'Corporate Gifting & Employee Swag',
        description:
          'Express gratitude with branded gifts for employees and clients.',
        icon: Support,
        href: '#',
        beta: true,
      },
      {
        label: 'Collegiate Merchandise',
        description:
          'Offer custom merchandise to students, alumni, and supporters with no upfront costs.',
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
        label: 'Articles & Guides',
        icon: Support,
        href: routes.internal.blog.href(),
      },
      {
        label: 'Morning Brew Case Study',
        icon: Support,
        href: routes.internal.customers.morningBrew.href(),
      },
      {
        label: 'Promotional Product Industry Terminology',
        icon: Support,
        href: routes.internal.glossary.href(),
      },
      {
        label: 'How To: Start a Merch Business',
        icon: Support,
        href: routes.internal.ebooks.studentMerchBusiness.href(),
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
