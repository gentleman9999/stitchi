import { Dialog, IconButton } from '@components/ui'
import Button from '@components/ui/ButtonV2/Button'
import { CheckIcon, ClipboardIcon, LinkIcon } from '@heroicons/react/24/outline'
import useClipboard from '@components/hooks/useClipboard'
import React from 'react'
import { XIcon } from 'icons'

export interface Props {
  open: boolean
  onClose: () => void
  absoluteUrl: string
}

const ClosetLinkShareDialog = ({ open, onClose, absoluteUrl }: Props) => {
  const [copied, setCopied] = React.useState(false)
  const { copy } = useClipboard()

  const handleCopy = () => {
    setCopied(true)
    copy(absoluteUrl)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <Dialog
      mobileFullScreen
      size="sm"
      open={open}
      onClose={() => onClose()}
      className="text-center"
      onOpenAutoFocus={e => e.preventDefault()}
    >
      <Dialog.Icon />
      <Dialog.Title>Collaboration link</Dialog.Title>
      <Dialog.Content>
        <Dialog.Close>
          {/* <IconButton onClick={() => onClose()} shift={['left', 'down']}> */}
          {/* <XIcon className="w-5 h-5 text-gray-300" /> */}
          {/* </IconButton> */}
        </Dialog.Close>
        <Dialog.ContentText>
          <Button
            className="w-full"
            size="xl"
            variant="ghost"
            endIcon={
              copied ? (
                <CheckIcon className="w-4 h-4" />
              ) : (
                <ClipboardIcon className="w-4 h-4" />
              )
            }
            onClick={handleCopy}
          >
            {copied ? 'Link copied' : 'Copy link'}
          </Button>
        </Dialog.ContentText>
      </Dialog.Content>
    </Dialog>
  )
}

export default ClosetLinkShareDialog
