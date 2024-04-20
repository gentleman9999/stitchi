'use client'

import React from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { CheckIcon } from '@heroicons/react/20/solid'
import { Control, Controller } from 'react-hook-form'
import { FormInput, Interest } from './HomePageHero'

const containerVariants = cva(
  'group cursor-pointer w-[180px] relative flex flex-col justify-center items-center gap-2 font-medium text-lg leading-tight border rounded-xl aspect-square text-center p-4 transition-colors duration-200',
  {
    variants: {
      color: {
        0: 'hover:border-red-500 focus:border-red-500 data-[checked=true]:border-red-500',
        1: 'hover:border-orange-500 focus:border-orange-500 data-[checked=true]:border-orange-500',
        2: 'hover:border-pink-500 focus:border-pink-500 data-[checked=true]:border-pink-500',
        3: 'hover:border-indigo-500 focus:border-indigo-500 data-[checked=true]:border-indigo-500',
        4: 'hover:border-blue-500 focus:border-blue-500 data-[checked=true]:border-blue-500',
        5: 'hover:border-cyan-500 focus:border-cyan-500 data-[checked=true]:border-cyan-500',
      },
    },
    defaultVariants: {
      color: 0,
    },
  },
)
const checkboxVariants = cva(
  'bg-gradient-to-br border border-gray-300 rounded w-6 h-6 flex items-center justify-center transition-colors duration-200',
  {
    variants: {
      color: {
        0: 'data-[checked=true]:from-red-500 data-[checked=true]:to-orange-500 data-[checked=true]:border-red-500 group-hover:border-red-500 group-focus:border-red-500',
        1: 'data-[checked=true]:from-orange-500 data-[checked=true]:to-fuchsia-500 data-[checked=true]:border-orange-500 group-hover:border-orange-500 group-focus:border-orange-500',
        2: 'data-[checked=true]:from-pink-500 data-[checked=true]:to-violet-500 data-[checked=true]:border-pink-500 group-hover:border-pink-500 group-focus:border-pink-500',
        3: 'data-[checked=true]:from-indigo-500 data-[checked=true]:to-blue-500 data-[checked=true]:border-indigo-500 group-hover:border-indigo-500 group-focus:border-indigo-500',
        4: 'data-[checked=true]:from-blue-500 data-[checked=true]:to-cyan-500 data-[checked=true]:border-blue-500 group-hover:border-blue-500 group-focus:border-blue-500',
        5: 'data-[checked=true]:from-cyan-500 data-[checked=true]:to-lime-500 data-[checked=true]:border-cyan-500 group-hover:border-cyan-500 group-focus:border-cyan-500',
      },
      defaultVariants: {
        color: 0,
      },
    },
  },
)
const iconVariants = cva(
  'flex flex-col items-center justify-center p-2 rounded-full bg-gradient-to-br',
  {
    variants: {
      color: {
        0: 'from-red-500 to-orange-500',
        1: 'from-orange-500 to-fuchsia-500',
        2: 'from-pink-500 to-violet-500',
        3: 'from-indigo-500 to-blue-500',
        4: 'from-blue-500 to-cyan-500',
        5: 'from-cyan-500 to-lime-500',
      },
    },
    defaultVariants: {
      color: 0,
    },
  },
)
const labelVariants = cva(
  'bg-gradient-to-br inline-block text-transparent bg-clip-text text-base font-bold',
  {
    variants: {
      color: {
        0: 'from-red-500 to-orange-500',
        1: 'from-orange-500 to-fuchsia-500',
        2: 'from-pink-500 to-violet-500',
        3: 'from-indigo-500 to-blue-500',
        4: 'from-blue-500 to-cyan-500',
        5: 'from-cyan-500 to-lime-500',
      },
    },
    defaultVariants: {
      color: 0,
    },
  },
)

const HomePageHeroListItem = ({
  label,
  value,
  name,
  description,
  icon,
  color,
  control,
}: {
  label: string
  name: string
  value: Interest
  description: string
  icon: React.ReactElement
  control: Control<FormInput>
} & VariantProps<typeof labelVariants>) => {
  return (
    <Controller
      name="interests"
      control={control}
      render={({ field }) => {
        const checked = field.value?.includes(value) ? 'true' : 'false'

        const handleChange = () => {
          field.onChange(
            field.value?.includes(value)
              ? field.value.filter((v: string) => v !== value)
              : [...(field.value || []), value],
          )
        }
        return (
          <li
            role="option"
            tabIndex={0}
            id={`option-${label}`}
            data-checked={checked}
            aria-selected={checked === 'true'}
            className={containerVariants({ color })}
            onKeyDown={e => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault()
                handleChange()
              }
            }}
            onClick={() => handleChange()}
          >
            <div className="absolute top-0 left-0 p-2">
              <input
                tabIndex={-1} // Prevents the checkbox from being focused when the user clicks on the list item
                type="checkbox"
                id={label}
                value={value}
                checked={checked === 'true'}
                className="sr-only"
              />
              <div
                aria-hidden
                className={checkboxVariants({ color })}
                data-checked={checked}
              >
                <CheckIcon className="h-4 w-4 text-white" />
              </div>
            </div>

            <div className={iconVariants({ color })}>{icon}</div>

            <label htmlFor={label} className={labelVariants({ color })}>
              {label}
            </label>

            <p className="text-gray-500 text-sm leading-tight">{description}</p>
          </li>
        )
      }}
    />
  )
}

export default HomePageHeroListItem
