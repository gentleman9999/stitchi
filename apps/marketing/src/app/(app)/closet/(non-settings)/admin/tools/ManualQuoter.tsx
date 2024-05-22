'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import * as yup from 'yup'
import useManualQuote from './useManualQuote'
import { useSnackbar } from 'app/snackbar-context'
import Button from '@components/ui/ButtonV2/Button'
import { InputGroup, TextField } from '@components/ui/inputs'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionTitle from '@components/common/ClosetSectionTitle'
import currency from 'currency.js'
import MoneyInput from '@components/ui/inputs/MoneyInput'

const schema = yup.object().shape({
  items: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          quantity: yup.number().required(),
          priceCents: yup.number().required(),
        })
        .required(),
    )
    .required(),
  addons: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          printLocation: yup
            .object()
            .shape({
              colorCount: yup.number().required(),
            })
            .required(),
        })
        .required(),
    )
    .required(),
})

const ManualQuoter = () => {
  const [loading, setLoading] = useState(false)
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      items: [],
      addons: [
        {
          printLocation: {
            colorCount: 1,
          },
        },
      ],
    },
  })
  const snackbar = useSnackbar()
  const [createQuote, { quote }] = useManualQuote()

  const itemArray = useFieldArray({
    control: form.control,
    name: 'items',
  })

  const addonArray = useFieldArray({
    control: form.control,
    name: 'addons',
  })

  const handleSubmit = form.handleSubmit(data => {
    setLoading(true)

    try {
      createQuote(data)
    } catch (error) {
      console.error('Failed to create manual quote', { context: { error } })
      snackbar.enqueueSnackbar({
        title: 'Failed to create manual quote',
        severity: 'error',
      })
    } finally {
      setLoading(false)
    }
  })

  return (
    <form onSubmit={handleSubmit}>
      <ClosetSection>
        <ClosetSectionHeader divider>
          <ClosetSectionTitle
            title="Products"
            actions={
              <Button
                variant="ghost"
                onClick={() =>
                  itemArray.append({
                    priceCents: 0,
                    quantity: 1,
                  })
                }
              >
                Add item
              </Button>
            }
          />
        </ClosetSectionHeader>

        {itemArray.fields.map((item, index) => (
          <div key={item.id} className="flex flex-row gap-2 items-center">
            <Controller
              name={`items.${index}.priceCents`}
              control={form.control}
              rules={{ onChange: v => (Number.isNaN(v) ? null : v) }}
              render={({ field, fieldState }) => (
                <InputGroup label="Price" error={fieldState.error?.message}>
                  <MoneyInput
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                    className="col-span-1"
                    inputRef={field.ref}
                  />
                </InputGroup>
              )}
            />
            <Controller
              name={`items.${index}.quantity`}
              control={form.control}
              rules={{ onChange: v => (Number.isNaN(v) ? null : v) }}
              render={({ field, fieldState }) => (
                <InputGroup label="Quantity" error={fieldState.error?.message}>
                  <TextField
                    type="number"
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value === null ? NaN.toString() : field.value}
                    className="col-span-1"
                    inputRef={field.ref}
                  />
                </InputGroup>
              )}
            />

            <Button variant="naked" onClick={() => itemArray.remove(index)}>
              Remove
            </Button>
          </div>
        ))}
      </ClosetSection>

      <ClosetSection>
        <ClosetSectionHeader divider>
          <ClosetSectionTitle
            title="Customizations"
            actions={
              <Button
                variant="ghost"
                onClick={() =>
                  addonArray.append({
                    printLocation: {
                      colorCount: 1,
                    },
                  })
                }
              >
                Add customization
              </Button>
            }
          />
        </ClosetSectionHeader>

        {addonArray.fields.map((addon, index) => (
          <div key={addon.id} className="flex flex-row gap-2 items-center">
            <Controller
              name={`addons.${index}.printLocation.colorCount`}
              control={form.control}
              rules={{ onChange: v => (Number.isNaN(v) ? null : v) }}
              render={({ field, fieldState }) => (
                <InputGroup
                  label="Color count"
                  error={fieldState.error?.message}
                >
                  <TextField
                    type="number"
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value === null ? NaN.toString() : field.value}
                    className="col-span-1"
                    inputRef={field.ref}
                  />
                </InputGroup>
              )}
            />

            <Button variant="naked" onClick={() => addonArray.remove(index)}>
              Remove
            </Button>
          </div>
        ))}
      </ClosetSection>

      <ClosetSection>
        <div className="flex justify-end">
          <Button type="submit" loading={loading} color="brandPrimary">
            Generate quote
          </Button>
        </div>
      </ClosetSection>

      {quote ? (
        <ClosetSection>
          <ClosetSectionHeader>
            <ClosetSectionTitle title="Quote" />
          </ClosetSectionHeader>
          Unit:{' '}
          {currency(quote.productUnitCostCents, { fromCents: true }).format()}
          <br />
          Total:{' '}
          {currency(quote.productTotalCostCents, { fromCents: true }).format()}
        </ClosetSection>
      ) : null}
    </form>
  )
}

export default ManualQuoter
