import nav from '@lib/navigation'
import React from 'react'
import cx from 'classnames'
import { Badge, Container } from '@components/ui'
import { Section, SubscribeInline } from '..'
import ClosingCtaSection from './ClosingCtaSection'

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            <List title="Services" items={navigation.services} />
            <List title="Solutions" items={navigation.solutions} />
            <List title="Resources" items={navigation.resources} />
            <List title="Company" items={navigation.company} />
          </div>
          <div className="">
            <h3 className="text-sm font-semibold text-gray-100 tracking-wider uppercase">
              Subscribe to updates
            </h3>
            <p className="mt-4 text-base text-gray-300">
              We ocassionaly send product updates and resources to help you with
              merch.
            </p>
            <SubscribeInline className="mt-4" />
          </div>

          <span className="m-auto font-medium text-gray-300">
            Proudly Built in Detroit
          </span>
        </div>

        <div className="mt-8 border-t border-gray-100 pt-8 md:flex md:items-center md:justify-between">
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
          <p className="mt-8 text-base text-gray-100 md:mt-0 md:order-1">
            &copy; {new Date().getFullYear()} Stitchi, LLC. All rights reserved.
          </p>
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
        className={cx('text-base text-gray-300 hover:text-gray-900', {
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
