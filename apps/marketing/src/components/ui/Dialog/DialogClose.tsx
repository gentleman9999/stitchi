import React from 'react'
import * as DC from '@radix-ui/react-dialog'
import { XIcon } from 'icons'
import IconButton from '../IconButton'

const DialogClose = (props: DC.DialogCloseProps) => {
  return (
    <DC.Close {...props} asChild>
      <IconButton
        shift={['left', 'down']}
        className="outline-none absolute top-0 right-0"
      >
        <XIcon className="w-5 h-5" />
      </IconButton>
    </DC.Close>
  )
}

export default DialogClose
