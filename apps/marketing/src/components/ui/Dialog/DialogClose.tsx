import React from 'react'
import * as DC from '@radix-ui/react-dialog'
import { XIcon } from 'icons'
import IconButton from '../IconButton'

interface Props extends DC.DialogCloseProps {}

const DialogClose = (props: Props) => {
  return (
    <DC.Close {...props} className="absolute top-0 right-0">
      <IconButton shift={['left', 'down']}>
        <XIcon className="w-5 h-5" />
      </IconButton>
    </DC.Close>
  )
}

export default DialogClose
