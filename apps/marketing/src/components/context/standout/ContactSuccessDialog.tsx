import React from 'react'
import { Dialog } from '@components/ui'
import { SubscribeInline } from '../..'

const ContactSuccessDialog = ({ email }: { email?: string }) => {
  const [open, setOpen] = React.useState(true)

  return (
    <Dialog
      size="lg"
      open={open}
      onClose={() => setOpen(false)}
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
        <SubscribeInline className="m-auto" centered defaultValue={email} />
      </Dialog.Actions>
    </Dialog>
  )
}

export default ContactSuccessDialog
