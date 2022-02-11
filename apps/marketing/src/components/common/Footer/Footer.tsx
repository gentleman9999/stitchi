import nav from '@lib/navigation'
import React from 'react'
import { Button, Container } from 'ui'
import { Section } from '..'

const navigation = nav.makeNavigation()

const Footer = () => (
  <footer aria-labelledby="footer-heading">
    <h2 id="footer-heading" className="sr-only">
      Footer
    </h2>
    <Container>
      <Section gutter="md">
        <div className="grid lg:grid-cols-1 xl:gap-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:col-span-1">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Resources
              </h3>
              <ul role="list" className="mt-4 space-y-4">
                {navigation.resources.map(item => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-base text-gray-500 hover:text-gray-900"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Legal
              </h3>
              <ul role="list" className="mt-4 space-y-4">
                {navigation.legal.map(item => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-base text-gray-500 hover:text-gray-900"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 lg:mt-0 col-span-3 lg:col-span-2">
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Subscribe to our newsletter
              </h3>
              <p className="mt-4 text-base text-gray-500">
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </p>
              <form className="mt-4 sm:flex sm:max-w-md">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  name="email-address"
                  id="email-address"
                  autoComplete="email"
                  required
                  className="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:placeholder-gray-400"
                  placeholder="Enter your email"
                />
                <div className="mt-3 sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <Button type="submit">Subscribe</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            {navigation.social.map(item => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">{item.label}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; {new Date().getFullYear()} Stitchi, LLC. All rights reserved.
          </p>
        </div>
      </Section>
    </Container>
  </footer>
)

export default Footer
