import { useRouter } from 'next/router'
import React from 'react'
import { Dialog } from '@components/ui'
import { SubscribeInline } from '..'

interface StandoutContext {}

const StandoutContext = React.createContext<StandoutContext | undefined>(
  undefined,
)

const StandoutProvider = ({ children }: { children: React.ReactNode }) => {
  const { query } = useRouter()

  return (
    <StandoutContext.Provider value={undefined}>
      <Standout standout={query.standout} />
      {children}
    </StandoutContext.Provider>
  )
}

const Standout = ({
  standout,
}: {
  standout: string | string[] | undefined
}) => {
  const { query } = useRouter()

  if (!standout) {
    return null
  }
  switch (standout) {
    case 'contact_success':
      return <ContactSuccessDialog email={query.email?.toString()} />
    default:
      return null
  }
}

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

export { StandoutProvider }
