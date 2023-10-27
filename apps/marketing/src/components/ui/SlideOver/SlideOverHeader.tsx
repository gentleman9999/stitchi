import { XMarkIcon } from '@heroicons/react/20/solid'
import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'

interface Props {
  title?: string
}

const SlideOverHeader = ({ title }: Props) => {
  return (
    <div className="p-2 sm:p-4 flex justify-between items-center border-b">
      {title ? (
        <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
      ) : null}
      <Dialog.DialogClose>
        <XMarkIcon className="w-6 h-6" />
      </Dialog.DialogClose>
    </div>
  )
}

export default SlideOverHeader
