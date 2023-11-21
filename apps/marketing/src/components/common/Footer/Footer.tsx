import nav from '@lib/navigation'
import React from 'react'
import cx from 'classnames'
import { Section, SubscribeInline } from '..'
import ClosingCtaSection from './ClosingCtaSection'
import Container from '@components/ui/Container'
import Badge from '@components/ui/Badge'
import routes from '@lib/routes'

const navigation = nav.makeNavigation()

const Footer = () => (
  <footer aria-labelledby="footer-heading" className="bg-black">
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
            <div className="flex-1 flex justify-center text-center sm:text-left sm:justify-end gap-4">
              <div className="flex flex-col gap-6">
                <ListItem
                  label="Solutions"
                  href={routes.internal.features.href()}
                />
                <ListItem
                  label="Catalog"
                  href={routes.internal.catalog.href()}
                />
                <ListItem label="Closet" href={routes.internal.closet.href()} />
              </div>
              <div className="flex flex-col gap-6">
                <ListItem
                  label="Articles & Guides"
                  href={routes.internal.blog.href()}
                />
                <ListItem
                  label="Careers"
                  href={routes.external.careers.href()}
                />
              </div>
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
                className="text-gray-100 hover:text-gray-300"
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
  </footer>
)

interface Item {
  label: string
  href: string
  beta?: boolean
}

const List = ({ title, items }: { title: string; items: Item[] }) => {
  return (
    <div className="col-span-1">
      <h3 className="text-sm font-semibold text-gray-100 tracking-wider uppercase">
        {title}
      </h3>
      <ul role="list" className="mt-4 space-y-4">
        {items.map(item => (
          <ListItem {...item} key={item.label} />
        ))}
      </ul>
    </div>
  )
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

export default Footer
