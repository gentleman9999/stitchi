import { Button, Dialog, IconButton, TextField } from '@components/ui'
import copy from 'copy-to-clipboard'
import { Link, XIcon } from 'icons'
import React from 'react'

interface Props {
  open: boolean
  onClose: () => void
}

const ShareDialog = (props: Props) => {
  const [copied, setCopied] = React.useState(false)

  if (typeof window === 'undefined') {
    return null
  }

  const handleCopy = () => {
    const success = copy(window.location.href)

    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    }
  }

  return (
    <Dialog size="lg" open={props.open} onClose={props.onClose}>
      <Dialog.Title>
        <div className="flex justify-between items-center">
          <div>Share with your team</div>
          <IconButton onClick={props.onClose}>
            <XIcon width={24} height={24} className="stroke-gray-800" />
          </IconButton>
        </div>
      </Dialog.Title>
      <Dialog.Content>
        <div className="flex gap-2 items-center">
          <TextField readOnly value={window.location.href} className="flex-1" />
          <Button
            slim
            color="brandPrimary"
            endIcon={!copied && <Link width={16} height={16} strokeWidth={2} />}
            onClick={handleCopy}
          >
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  )
}

export default ShareDialog
