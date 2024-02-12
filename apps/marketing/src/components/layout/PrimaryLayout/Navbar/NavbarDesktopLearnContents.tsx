import React from 'react'
import Image from 'next/legacy/image'
import usps from '../../../../../public/customers/morning_brew/global_fast_delivery.jpg'
import { generateImageSizes } from '@lib/utils/image'
import { Popover } from '@headlessui/react'
import Link from 'next/link'
import routes from '@lib/routes'
import Button from '@components/ui/Button'

const linkClass =
  'font-semibold border-2 border-transparent hover:border-primary hover:bg-gray-50 p-2 rounded-sm -translate-x-1 transition-all'

interface Props {}

const NavbarDesktopLearnContents = () => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4 divide-x">
      <div className="col-span-2 flex gap-4">
        <div className="relative w-48 h-48">
          <Image
            src={usps.src}
            alt="Promotional product case study"
            layout="fill"
            objectFit="cover"
            sizes={generateImageSizes([{ imageWidth: '300px' }])}
          />
        </div>
        <div className="flex flex-col gap-2 justify-between">
          <div>
            <span className="p-1 border-2 rounded-sm border-gray-800  font-semibold text-sm">
              Case study
            </span>
          </div>
          <div>
            <Link
              href={routes.internal.customers.morningBrew.href()}
              className="text-2xl font-bold font-heading leading-tight"
            >
              <Popover.Button>
                Stitchi Fulfillment: Reduce CAC, multiply growth
              </Popover.Button>
            </Link>

            <br />
            <br />
            <Link href={routes.internal.customers.morningBrew.href()}>
              <Button>
                <Popover.Button as="div">Read more</Popover.Button>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="col-span-1 pl-8 flex flex-col">
        <h2 className="text-3xl font-bold font-heading p-1">Resources</h2>
        <Link passHref href={routes.internal.blog.href()} className={linkClass}>
          <Popover.Button as="div">Blog</Popover.Button>
        </Link>
        <Link
          passHref
          href={routes.internal.glossary.href()}
          className={linkClass}
        >
          <Popover.Button as="div">
            Promotional Products Directory
          </Popover.Button>
        </Link>
        <Link
          passHref
          href={routes.internal.lookbook.href()}
          className={linkClass}
        >
          <Popover.Button as="div">Design Lookbook</Popover.Button>
        </Link>
        <Link
          passHref
          href={routes.external.support.href()}
          target="_blank"
          className={linkClass}
        >
          <Popover.Button as="div">Support</Popover.Button>
        </Link>
      </div>
    </div>
  )
}

export default NavbarDesktopLearnContents
