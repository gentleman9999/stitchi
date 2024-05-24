import React from 'react'
import Image from 'next/legacy/image'
import usps from '../../../../public/customers/morning_brew/global_fast_delivery.jpg'
import { generateImageSizes } from '@lib/utils/image'
import Link from 'next/link'
import routes from '@lib/routes'
import Button from '@components/ui/ButtonV2/Button'
import PopperButton from './PopperButton'
import IntercomButton from '@components/common/IntercomButton'

const linkClass = 'font-semibold hover:underline underline-offset-4'

const LearnContentsDesktop = () => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 divide-x rounded-sm ring-1 ring-gray-300">
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
            <PopperButton>
              <Link
                href={routes.internal.customers.morningBrew.href()}
                className="text-2xl font-bold font-heading leading-tight"
              >
                Stitchi Fulfillment: Reduce CAC, multiply growth
              </Link>
            </PopperButton>

            <br />
            <br />
            <PopperButton>
              <Button
                Component={Link}
                href={routes.internal.customers.morningBrew.href()}
              >
                Read more
              </Button>
            </PopperButton>
          </div>
        </div>
      </div>
      <div className="col-span-1 pl-8 flex flex-col gap-4">
        <h2 className="text-3xl font-bold font-heading">Learning</h2>
        <ul className="flex flex-col gap-2">
          <li>
            <PopperButton>
              <Link href={routes.internal.blog.href()} className={linkClass}>
                Stitchi Blog
              </Link>
            </PopperButton>
          </li>
          <li>
            <PopperButton>
              <Link
                href={routes.internal.glossary.href()}
                className={linkClass}
              >
                Merch Directory
              </Link>
            </PopperButton>
          </li>
          <li>
            <PopperButton>
              <Link
                href={routes.internal.learn.show.referralPrograms.href()}
                className={linkClass}
              >
                Referral Program Automation
              </Link>
            </PopperButton>
          </li>
        </ul>
      </div>
      <div className="col-span-1 pl-8 flex flex-col gap-4">
        <h2 className="text-3xl font-bold font-heading">Resources</h2>
        <ul className="flex flex-col gap-2">
          <li>
            <PopperButton>
              <Link
                href={routes.external.support.href()}
                target="_blank"
                className={linkClass}
              >
                Help Center
              </Link>
            </PopperButton>
          </li>

          <li>
            <PopperButton>
              <Link
                href={routes.internal.lookbook.href()}
                className={linkClass}
              >
                Design Lookbook
              </Link>
            </PopperButton>
          </li>

          <li>
            <PopperButton>
              <Link
                href={routes.internal.partners.href()}
                className={linkClass}
              >
                Partners
              </Link>
            </PopperButton>
          </li>

          <li>
            <PopperButton>
              <IntercomButton
                as={
                  <button className={linkClass}>Talk to a Merch Expert</button>
                }
              />
            </PopperButton>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default LearnContentsDesktop
