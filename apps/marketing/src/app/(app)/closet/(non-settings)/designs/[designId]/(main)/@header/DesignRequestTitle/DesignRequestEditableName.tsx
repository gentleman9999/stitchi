'use client'

import { ScopeAction, ScopeResource } from '@generated/globalTypes'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthorizedComponent } from '@lib/auth'
import { Pencil } from 'icons'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDebouncedCallback } from 'use-debounce'
import * as yup from 'yup'
import { useDesignContext } from '../../design-context'
import useUpdateName from './useUpdateName'

const schema = yup.object().shape({
  name: yup.string().min(2).required(),
})

type FormValues = yup.InferType<typeof schema>

interface Props {
  designRequestId: string
  name: string | null
}

const DesignRequestEditableName = ({
  designRequestId,
  name: defaultName,
}: Props) => {
  const { setSaving } = useDesignContext()
  const [edit, setEdit] = React.useState(false)
  const shadowInput = React.useRef<HTMLDivElement>(null)
  const [updateName] = useUpdateName({ designRequestId })

  const [inputWidthPx, setInputWidthPx] = React.useState(0)

  const form = useForm<FormValues>({
    defaultValues: {
      name: defaultName || '',
    },
    resolver: yupResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const name = form.watch('name')

  React.useEffect(() => {
    if (edit) {
      form.setFocus('name')
    }
  }, [edit, form])

  React.useEffect(() => {
    if (name && shadowInput.current) {
      setInputWidthPx(shadowInput.current.getBoundingClientRect().width + 2)
    }
  }, [name])

  const handleEdit = () => {
    setEdit(true)
  }

  const handleUpdateName = useDebouncedCallback(
    async () => {
      setSaving(true)

      try {
        const valid = await form.trigger('name', { shouldFocus: true })

        if (valid) {
          const name = form.getValues('name')

          if (name === defaultName) return

          await updateName(name)
        }
      } finally {
        setSaving(false)
      }
    },
    800,
    { leading: true },
  )

  return (
    <div className="flex relative">
      <span className="text-gray-800 font-semibold flex-1">
        <div className="relative flex flex-col">
          <div
            ref={shadowInput}
            className="invisible absolute whitespace-pre inline"
          >
            {name}
          </div>
          <input
            disabled={!edit}
            className="disabled:bg-transparent outline-primary "
            onFocus={() => setEdit(true)}
            style={{ width: `${inputWidthPx}px` }}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                event.currentTarget.blur()
              }
            }}
            {...form.register('name', {
              onBlur: () => {
                setEdit(false)
                handleUpdateName()
              },
            })}
          />
          <span className="text-red-500 text-xs">
            {form.formState.errors.name?.message}
          </span>

          {!edit ? (
            <AuthorizedComponent
              resource={ScopeResource.DesignRequest}
              action={ScopeAction.UPDATE}
            >
              <button className="absolute -right-3 top-0">
                <Pencil className="w-3 h-3" onClick={handleEdit} />
              </button>
            </AuthorizedComponent>
          ) : null}
        </div>
      </span>
    </div>
  )
}

export default DesignRequestEditableName
