import { Container } from '@/components/ui'
import React from 'react'
import Banner from './Banner'

interface Props {}

export default function Footer(props: Props) {
  return (
    <footer className="mt-10">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <Banner />
      <Container>
        <div className="py-10">
          <p className="text-base text-gray-400 md:mt-0 md:order-1">
            &copy; {new Date().getFullYear()} Stitchi, LLC. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
