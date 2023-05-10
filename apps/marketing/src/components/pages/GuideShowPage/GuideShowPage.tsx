import Author from './Author'
import Footer from './Footer'
import Hero from './Hero'
import Introduction from './Introduction'
import Pricing from './Pricing'
import TableOfContents from './TableOfContents'
import Testimonial from './Testimonial'
import waltBorlandHeadshot from '../../../../public/walt-borland-professor-umich.jpg'
import { NextSeo } from 'next-seo'
import routes from '@lib/routes'

const GuideShowPage = () => {
  return (
    <div>
      <NextSeo
        title="How to start a merch business"
        description="A book that teaches you how to build a profitable merch business as a
              college student."
        canonical={routes.internal.ebooks.studentMerchBusiness.href()}
      />
      <Hero />
      <Introduction />
      <TableOfContents />
      <Testimonial
        id="testimonial-from-tommy-stroman"
        author={{
          name: 'Walt Borland',
          role: 'Senior Fellow, University of Michigan',
          image: waltBorlandHeadshot,
        }}
      >
        <p>
          “The ultimate playbook for a lucrative custom merch business, Cash in
          on Merch is an indispensable resource for students balancing academics
          and entrepreneurship.”
        </p>
      </Testimonial>
      <Pricing />
      <Author />
      <Footer />
    </div>
  )
}

export default GuideShowPage
