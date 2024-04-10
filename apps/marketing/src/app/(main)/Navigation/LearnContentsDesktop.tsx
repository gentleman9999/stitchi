import React from 'react'
import Image from 'next/legacy/image'
import usps from '../../../../public/customers/morning_brew/global_fast_delivery.jpg'
import { generateImageSizes } from '@lib/utils/image'
import Link from 'next/link'
import routes from '@lib/routes'
import Button from '@components/ui/ButtonV2/Button'
import { DropdownMenuItem } from '@components/ui/dropdown-menu'

const linkClass =
  'font-semibold border-2 border-transparent hover:border-primary hover:bg-gray-50 p-2 rounded-sm -translate-x-1 transition-all'

const LearnContentsDesktop = () => {
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
            <DropdownMenuItem asChild>
              <Link
                href={routes.internal.customers.morningBrew.href()}
                className="text-2xl font-bold font-heading leading-tight"
              >
                Stitchi Fulfillment: Reduce CAC, multiply growth
              </Link>
            </DropdownMenuItem>

            <br />
            <br />
            <DropdownMenuItem asChild>
              <Button
                Component={Link}
                href={routes.internal.customers.morningBrew.href()}
              >
                Read more
              </Button>
            </DropdownMenuItem>
          </div>
        </div>
      </div>
      <div className="col-span-1 pl-8 flex flex-col">
        <h2 className="text-3xl font-bold font-heading p-1">Resources</h2>
        <DropdownMenuItem asChild>
          <Link href={routes.internal.blog.href()} className={linkClass}>
            Blog
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={routes.internal.glossary.href()} className={linkClass}>
            Promotional Products Directory
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={routes.internal.lookbook.href()} className={linkClass}>
            Design Lookbook
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href={routes.external.support.href()}
            target="_blank"
            className={linkClass}
          >
            Support
          </Link>
        </DropdownMenuItem>
      </div>
    </div>
  )
}

export default LearnContentsDesktop
