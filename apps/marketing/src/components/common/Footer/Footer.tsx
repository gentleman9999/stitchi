import nav from '@lib/navigation'
import React from 'react'
import cx from 'classnames'
import ClosingCtaSection from './ClosingCtaSection'
import Container from '@components/ui/Container'
import Badge from '@components/ui/Badge'
import routes from '@lib/routes'
import Section from '../Section'
import SubscribeInline from '../SubscribeInline'
import InfiniteLooper from '../InfiniteLooper'
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const navigation = nav.makeNavigation()

const Footer = () => (
  <footer aria-labelledby="footer-heading" className="bg-midnight">
    <h2 id="footer-heading" className="sr-only">
      Footer
    </h2>
    <ClosingCtaSection />
    <Container>
      <Section gutter="md">
        <div className="grid grid-cols-1 gap-8">
          <div className="flex flex-col sm:flex-row gap-x-8 gap-y-12">
            <div className="flex-1 flex flex-col items-center sm:items-start">
              <h3 className="text-sm font-semibold text-gray-100 tracking-wider uppercase">
                Subscribe to updates
              </h3>
              <p className="mt-4 text-base text-center sm:text-left text-gray-300 max-w-xs">
                We occasionally send product updates and resources to help you
                with merch.
              </p>
              <SubscribeInline className="mt-4" variant="primary" />
            </div>
            <div className="flex-1 flex justify-center text-center sm:text-left sm:justify-end gap-12">
              <ListItemGroup
                label="Solutions"
                items={[
                  {
                    label: 'Features',
                    href: routes.internal.solutions.href(),
                  },

                  {
                    label: 'Loyalty & Referral Programs',
                    href: routes.internal.solutions.loyaltyPrograms.href(),
                  },

                  {
                    label: 'Swag Bags & Boxes',
                    href: routes.internal.solutions.swagBox.href(),
                  },

                  {
                    label: 'Tradeshows',
                    href: routes.internal.tradeshows.href(),
                  },
                ]}
              />

              <ListItemGroup
                label="Resources"
                items={[
                  {
                    label: 'Product catalog',
                    href: routes.internal.catalog.href(),
                  },
                  {
                    label: 'Blog',
                    href: routes.internal.blog.href(),
                  },
                  {
                    label: 'Partner Program',
                    href: routes.internal.partners.href(),
                  },
                  {
                    label: 'Articles & Guides',
                    href: routes.internal.learn.href(),
                  },
                  {
                    label: 'Merch Insights',
                    href: routes.internal.insights.href(),
                  },
                ]}
              />
            </div>
          </div>

          <span className="m-auto font-medium text-gray-300">
            Proudly Built in Detroit
          </span>
        </div>

        <div className="mt-8 border-t pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            {navigation.social.map(item => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-100 hover:text-gray-300 fill-gray-100 hover:fill-gray-300"
                target="_blank"
              >
                <span className="sr-only">{item.label}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <ul className="flex items-center gap-8 mb-3">
              <ListItem
                label="Privacy"
                href={routes.internal.legal.privacy.href()}
              />
              <ListItem
                label="Terms"
                href={routes.internal.legal.terms.href()}
              />
              <ListItem label="Careers" href={routes.external.careers.href()} />
              <ListItem label="Support" href={routes.external.support.href()} />
            </ul>
            <p className="text-base text-gray-100 ">
              &copy; {new Date().getFullYear()} Stitchi, LLC. All rights
              reserved.
            </p>
          </div>
        </div>
      </Section>
    </Container>

    <Link href={routes.internal.getStarted.href()} className="mt-12 block">
      <div className=" py-4 text-primary">
        <InfiniteLooper speed={10} direction="right">
          <div className="flex items-center mr-10">
            <span
              className="text-2xl md:text-3xl font-bold uppercase mr-10 drop-shadow-sm"
              style={{ wordSpacing: 16 }}
            >
              Merch made simple
            </span>
            <ArrowRightCircleIcon className="w-8 h-8 md:w-10 md:h-10" />
          </div>
        </InfiniteLooper>
      </div>
    </Link>
  </footer>
)

interface Item {
  label: string
  href: string
  beta?: boolean
}

const ListItem = ({ label, href, beta }: Item) => {
  const disabled = Boolean(beta)
  return (
    <li>
      <a
        href={href}
        className={cx('text-base text-gray-300 hover:text-gray-100', {
          'pointer-events-none touch-none': disabled,
        })}
      >
        {label}
        {disabled && (
          <Badge
            label="Coming soon"
            size="small"
            className="ml-1 my-0 bg-gray-300 text-gray-700"
          />
        )}
      </a>
    </li>
  )
}

interface ListItemGroupProps {
  items: Item[]
  label: string
}

const ListItemGroup = ({ items, label }: ListItemGroupProps) => (
  <div className="flex-1 sm:flex-initial flex flex-col gap-6">
    <h4 className="text-base font-semibold text-gray-100 tracking-wider">
      {label}
    </h4>
    <ul className="flex flex-col gap-6">
      {items.map(item => (
        <ListItem key={item.label} {...item} />
      ))}
    </ul>
  </div>
)

export default Footer
