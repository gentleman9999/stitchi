import React from 'react'
import Dialog from '@components/ui/Dialog'
import { SubscribeInline } from '../..'
import { useRouter } from 'next/router'

interface Props {
  open: boolean
  onClose: () => void
}

const HelpDialog = ({ onClose, open }: Props) => {
  const { query } = useRouter()
  const { email } = query

  return (
    <Dialog
      size="lg"
      open={open}
      onClose={() => onClose()}
      className="text-center"
    >
      <Dialog.Icon />
      <Dialog.Title>We&apos;ll be in touch right away</Dialog.Title>
      <Dialog.Content>
        <Dialog.ContentText>
          <p>
            Subscribe to receive the latest news, articles, and resources, sent
            to your inbox weekly.
          </p>
        </Dialog.ContentText>
      </Dialog.Content>
      <Dialog.Actions>
        <SubscribeInline
          className="m-auto"
          centered
          defaultValue={typeof email === 'string' ? email : undefined}
        />
      </Dialog.Actions>
    </Dialog>
  )
}

export default HelpDialog
