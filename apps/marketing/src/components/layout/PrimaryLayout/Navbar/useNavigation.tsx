import { ReactChild } from 'react'
import routes from '@lib/routes'
import {
  AttachMoney,
  AutoAwesome,
  DesktopComputer,
  School,
  SentimentSatisfied,
  Support,
} from 'icons'

const iconBaseProps = { fill: 'var(--tertiary)' }

const navigation: Navigation = [
  {
    label: 'Why Stitchi?',
    subNav: [
      {
        label: 'Pro Merch Designs (Free)',
        description:
          "We'll design your merch for you, and you'll get paid for it.",
        icon: <Support {...iconBaseProps} />,
        href: '',
      },
      {
        label: 'Quality Customizations',
        description:
          "We'll design your merch for you, and you'll get paid for it.",
        icon: <Support {...iconBaseProps} />,

        href: '',
      },
      {
        label: 'eCommerce, Warehousing & Distribution',
        description:
          "We'll design your merch for you, and you'll get paid for it.",
        icon: <Support {...iconBaseProps} />,
        href: '',
      },
    ],
  },
  {
    label: 'Resources',
    subNav: [
      {
        label: 'Learn',
        icon: <Support {...iconBaseProps} />,
        href: routes.internal.blog.href(),
      },
      {
        label: 'Morning Brew Case Study',
        icon: <Support {...iconBaseProps} />,
        href: '',
      },
      {
        label: 'About Us',
        icon: <Support {...iconBaseProps} />,
        href: '',
      },
    ],
  },
]

type Icon = { url: string; height: number; width: number } | ReactChild | null

interface SubNavItem {
  href: string
  label: string
  description?: string
  icon?: Icon
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
  return navigation
}
