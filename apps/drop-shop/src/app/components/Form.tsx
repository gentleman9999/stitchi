'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object({
  size: yup.string().required(),
  quantity: yup.number().min(1).max(10).required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
})

type Schema = yup.Asserts<typeof schema>

interface Product {
  sizes: string[]
}

interface Props {
  product: Product
}

export default function Form({ product }: Props) {
  const form = useForm<Schema>({
    resolver: yupResolver(schema),
    defaultValues: {
      quantity: 1,
    },
  })

  const handleSubmit = form.handleSubmit(async data => {})

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="size">Size</label>
        <select {...form.register('size')} id="size">
          {product.sizes.map(size => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="quantity">Quantity</label>
        <input {...form.register('quantity')} id="quantity" type="number" />
      </div>

      <div>
        <label htmlFor="name">Name</label>
        <input
          {...form.register('name')}
          id="name"
          type="text"
          autoComplete="name"
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          {...form.register('email')}
          id="email"
          type="email"
          autoComplete="email"
        />
      </div>
      <div>
        <button type="submit" className="border rounded-md py-2 px-4">
          Pre-Order
        </button>
      </div>
    </form>
  )
}
