import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { FormValues } from './ProductBuyPageForm'
import * as Switch from '@radix-ui/react-switch'
import { Customization, GlobalDistribution2 } from 'icons'
import Link from 'next/link'
import routes from '@lib/routes'
import currency from 'currency.js'

interface Props {
  form: UseFormReturn<FormValues>
}

const AddonsForm = ({ form }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <Controller
        name="includeFulfillment"
        control={form.control}
        render={({ field }) => (
          <AddonField
            label="No-touch fulfillment"
            price={100}
            value={field.value}
            onChange={field.onChange}
            Icon={<GlobalDistribution2 />}
            description={
              <>
                Save money, time, and worry less when you let Stitchi fulfill
                your orders and customer service inquiries.{' '}
                <Link
                  href={routes.internal.features.distribution.href()}
                  className="underline"
                  target="_blank"
                >
                  Learn more
                </Link>
              </>
            }
          />
        )}
      />
      <Controller
        name="includeDesign"
        control={form.control}
        render={({ field }) => (
          <AddonField
            label="Design"
            price={0}
            value={field.value}
            onChange={field.onChange}
            Icon={<Customization />}
            description={
              <>
                Our team of designers will work with you to create a design that
                you love.{' '}
                <Link
                  href={routes.internal.features.design.href()}
                  className="underline"
                  target="_blank"
                >
                  Learn more
                </Link>
              </>
            }
          />
        )}
      />
    </div>
  )
}

const AddonField = ({
  label,
  description,
  price,
  value,
  onChange,
  Icon,
}: {
  label: string
  description: React.ReactNode
  price: number
  value: boolean
  onChange: (value: boolean) => void
  Icon: React.ReactElement<{ className: string }>
}) => (
  <div className="p-4 rounded-md bg-gray-900 @container">
    <div className="flex gap-4 items-center">
      {React.cloneElement(Icon, {
        className: 'w-10 h-10 shrink-0 stroke-2 hidden @xs:block',
      })}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <label className="text-sm text-white flex whitespace-nowrap gap-1 relative">
            {label} (
            {price ? currency(price, { fromCents: true }).format() : 'free'}){' '}
          </label>
          <div className="text-xs text-gray-300 text-left">{description}</div>
        </div>
      </div>

      <Switch.Root
        className="h-6 w-11 flex-shrink-0 bg-gray-200 data-[state='checked']:bg-primary rounded-full relative checked:bg-gray-900 flex items-center border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        id="includeFulfillment"
        checked={value}
        onCheckedChange={onChange}
      >
        <Switch.Thumb className="block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out data-[state='checked']:translate-x-5" />
      </Switch.Root>
    </div>
  </div>
)

export default AddonsForm
