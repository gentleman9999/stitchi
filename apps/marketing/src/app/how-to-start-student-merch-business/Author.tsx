import Section from '@components/common/Section'
import GridPattern from '@components/ui/GridPattern'
import routes from '@lib/routes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SectionHeading from './SectionHeader'
import authorImage from '../../../public/everest-guerra.jpg'

const TwitterIcon = ({ ...props }) => {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 40" {...props}>
      <path d="M13.817 33.753c12.579 0 19.459-10.422 19.459-19.458 0-.297 0-.592-.02-.884a13.913 13.913 0 0 0 3.411-3.543 13.65 13.65 0 0 1-3.928 1.077 6.864 6.864 0 0 0 3.007-3.784 13.707 13.707 0 0 1-4.342 1.66 6.845 6.845 0 0 0-11.655 6.239A19.417 19.417 0 0 1 5.654 7.915a6.843 6.843 0 0 0 2.117 9.128 6.786 6.786 0 0 1-3.104-.853v.086a6.842 6.842 0 0 0 5.487 6.704 6.825 6.825 0 0 1-3.088.116 6.847 6.847 0 0 0 6.39 4.75A13.721 13.721 0 0 1 3.334 30.68a19.36 19.36 0 0 0 10.483 3.066" />
    </svg>
  )
}

interface Props {}

const Author = (props: Props) => {
  return (
    <Section
      label="author-title"
      gutter="lg"
      className="relative scroll-mt-14 sm:scroll-mt-32"
    >
      <div className="absolute inset-x-0 bottom-0 top-1/2 text-gray-900/10 [mask-image:linear-gradient(transparent,white)]">
        <GridPattern x="50%" y="100%" />
      </div>
      <div className="relative mx-auto max-w-5xl pt-16 sm:px-6">
        <div className="bg-gray-50 pt-px sm:rounded-3xl">
          <div className="relative mx-auto -mt-16 h-44 w-44 overflow-hidden rounded-full bg-gray-200 md:float-right md:h-64 md:w-64 md:[shape-outside:circle(40%)] lg:mr-20 lg:h-72 lg:w-72">
            <Image
              className="absolute inset-0 h-full w-full object-cover"
              src={authorImage}
              alt="Everest Guerra avatar"
              sizes="(min-width: 1024px) 18rem, (min-width: 768px) 16rem, 11rem"
            />
          </div>
          <div className="px-4 py-10 sm:px-10 sm:py-16 md:py-20 lg:px-20 lg:py-32">
            <SectionHeading number="2">Author</SectionHeading>
            <p className="mt-8 font-display text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
              <span className="block text-primary">Everest Guerra –</span> Hey!
              I&apos;m the author of &apos;Cash in on Merch&apos;.
            </p>
            <p className="mt-4 text-lg tracking-tight text-gray-700">
              I&apos;ve been a custom merch expert for several years and am the
              proud founder of Stitchi, a simplified all-in-one merch platform.
              My journey in the world of custom merch began during my time at
              the University of Michigan, where I founded a student merch
              business that catered to my fellow Wolverines. This experience not
              only taught me the ins and outs of the industry but also helped me
              develop strategies and techniques that can be implemented by
              anyone.
            </p>
            <p className="mt-4 text-lg tracking-tight text-gray-700">
              My mission is to empower students and young entrepreneurs to turn
              their passion for custom merch into a profitable venture. As a
              speaker and mentor, I have shared my knowledge and experiences at
              various events and workshops. My teaching style has been
              fine-tuned to resonate with individuals eager to learn the secrets
              of launching a successful custom merch business.
            </p>
            <p className="mt-4 text-lg tracking-tight text-gray-700">
              So, whether you&apos;re a student or an aspiring entrepreneur
              looking to create a lucrative side-hustle, I&apos;m here to guide
              you through the exciting world of custom merchandising!
            </p>
            <p className="mt-8">
              <Link
                href={routes.external.social.twitter.href()}
                className="inline-flex items-center text-base font-medium tracking-tight text-primary"
                target="_blank"
              >
                <TwitterIcon className="h-10 w-10 fill-current" />
                <span className="ml-4">Follow on Twitter</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Author
