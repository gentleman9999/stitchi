import { Support, Twitter } from 'icons'
import { routes } from '.'

export type Navigation = ReturnType<typeof navigation.makeNavigation>

const navigation = {
  makeNavigation: () => ({
    resources: [
      // {
      //   label: 'Partners',
      //   icon: SentimentSatisfied,
      //   href: routes.internal.partners.href(),
      // },

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
        label: 'Design Lookbook',
        icon: Support,
        href: routes.internal.lookbook.href(),
      },
      {
        label: 'How To: Start a Merch Business',
        icon: Support,
        href: routes.internal.ebooks.studentMerchBusiness.href(),
      },
      {
        label: 'Support',
        icon: Support,
        href: routes.external.support.href(),
      },

      // {
      //   label: 'About us',
      //   icon: Support,
      //   href: '#',
      // },
    ],
    company: [
      // { label: 'Claim', href: '#' },
      {
        label: 'Support',
        icon: Support,
        href: routes.external.support.href(),
      },
      {
        label: 'Careers',
        icon: Support,
        href: routes.external.careers.href(),
      },
      // {
      //   label: 'Contact Us',
      //   icon: Support,
      //   href: routes.internal.contact.href(),
      // },
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
