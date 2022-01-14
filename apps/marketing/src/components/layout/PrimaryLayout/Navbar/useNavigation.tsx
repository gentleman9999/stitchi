import { ReactChild } from 'react'
import navigation from '@generated/navigation.json'
import routes from '@lib/routes'
import {
  AttachMoney,
  AutoAwesome,
  DesktopComputer,
  School,
  SentimentSatisfied,
  Support,
} from 'icons'

const { features, featuresTitle } = navigation

const iconBaseProps = { fill: 'white' }

type Icon = { url: string; height: number; width: number } | ReactChild | null

interface SubNavItem {
  href: string
  label: string
  description?: string
  icon?: Icon
  external?: boolean
}

interface NavItemBase {
  label: string
}

interface DropdownNavItem extends NavItemBase {
  subNav: SubNavItem[]
}

interface NavItem extends NavItemBase {
  href: string
  external?: boolean
}

export type Navigation = (NavItem | DropdownNavItem)[]

export default function useNavigation() {
  const navigation: Navigation = [
    {
      label: featuresTitle,
      subNav: features.map(feature => ({
        label: feature.label,
        description: feature.description,
        icon: feature.icon,
        href: '',
        // href: routes.internal.features.show.href(feature.slug),
      })),
    },
    // {
    //   label: 'Resources',
    //   subNav: [
    //     {
    //       label: 'Book a demo',
    //       href: routes.app.demo.href(),
    //       icon: <DesktopComputer {...iconBaseProps} />,
    //     },
    //     {
    //       label: 'Blog',
    //       href: routes.internal.blog.href(),
    //       icon: <School {...iconBaseProps} />,
    //     },
    //     {
    //       label: 'Customer stories',
    //       href: routes.internal.caseStudies.href(),
    //       icon: <SentimentSatisfied {...iconBaseProps} />,
    //     },
    //     {
    //       external: true,
    //       label: 'Help center',
    //       href: routes.external.zendesk.href(),
    //       icon: <Support {...iconBaseProps} />,
    //     },
    //     {
    //       label: 'About us',
    //       href: routes.internal.about.href(),
    //       icon: <AutoAwesome {...iconBaseProps} />,
    //     },
    //     // {
    //     //   label: "Partners",
    //     //   href: routes.internal.partners.href(),
    //     //   icon: <AttachMoney {...iconBaseProps} />,
    //     // },
    //   ],
    // },
    // {
    //   label: 'Pricing',
    //   href: routes.app.pricing.href(),
    // },
    // {
    //   label: 'Login',
    //   href: routes.app.login.href(),
    // },
  ]

  return navigation
}
