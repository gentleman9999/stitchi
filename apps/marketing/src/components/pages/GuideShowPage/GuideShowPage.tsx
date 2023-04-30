import Author from './Author'
import Footer from './Footer'
import Hero from './Hero'
import Introduction from './Introduction'
import Pricing from './Pricing'
import TableOfContents from './TableOfContents'
import Testimonial from './Testimonial'
import waltBorlandHeadshot from '../../../../public/walt-borland-professor-umich.jpg'

const GuideShowPage = () => {
  return (
    <div>
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
