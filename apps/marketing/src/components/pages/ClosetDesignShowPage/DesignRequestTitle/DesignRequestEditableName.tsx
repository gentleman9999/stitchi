import { yupResolver } from '@hookform/resolvers/yup'
import { Pencil } from 'icons'
import React from 'react'
import { useForm } from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'
import { useDebouncedCallback } from 'use-debounce'
import * as yup from 'yup'
import { useDesignContext } from '../design-context'
import useUpdateName from './useUpdateName'

const schema = yup.object().shape({
  name: yup.string().min(2).required(),
})

type FormValues = yup.InferType<typeof schema>

interface Props {
  loading: boolean
  designRequestId?: string | null
  name?: string | null
}

const DesignRequestEditableName = ({
  name,
  loading,
  designRequestId,
}: Props) => {
  return (
    <div className="flex relative">
      {/* Design{' '} */}
      <span className="text-gray-800 font-semibold">
        {loading ? (
          <Skeleton className="w-32" />
        ) : designRequestId ? (
          <Form defaultName={name} designRequestId={designRequestId} />
        ) : (
          name
        )}
      </span>
    </div>
  )
}

const Form = ({
  designRequestId,
  defaultName,
}: {
  designRequestId: string
  defaultName?: string | null
}) => {
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
      const valid = await form.trigger('name', { shouldFocus: true })

      if (valid) {
        const name = form.getValues('name')

        if (name === defaultName) return

        await updateName(name)
      }
      setSaving(false)
    },
    800,
    { leading: true },
  )

  return (
    <div className="relative flex flex-col">
      <div ref={shadowInput} className="invisible absolute whitespace-pre">
        {name}
      </div>
      <input
        disabled={!edit}
        className="disabled:bg-transparent outline-primary"
        onFocus={() => setEdit(true)}
        style={{ width: `${inputWidthPx}px` }}
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
        <button className="absolute -right-3 top-0">
          <Pencil className="w-3 h-3" onClick={handleEdit} />
        </button>
      ) : null}
    </div>
  )
}

export default DesignRequestEditableName
