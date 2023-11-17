import Button from '@components/ui/ButtonV2/Button'
import Dialog from '@components/ui/Dialog'
import IconButton from '@components/ui/IconButton'
import { TextField } from '@components/ui/inputs'
import copy from 'copy-to-clipboard'
import { Link, XIcon } from 'icons'
import React from 'react'

interface Props {
  open: boolean
  onClose: () => void
  href?: string
}

const ShareDialog = (props: Props) => {
  const [copied, setCopied] = React.useState(false)

  const href = props.href || window.location.href

  const handleCopy = () => {
    const success = copy(href)

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
        <div className="flex gap-2 items-stretch">
          <TextField readOnly value={href} className="flex-1" />
          <Button
            color="brandPrimary"
            endIcon={!copied && <Link width={16} height={16} strokeWidth={2} />}
            onClick={handleCopy}
            className="!max-h-none"
          >
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  )
}

export default ShareDialog
