import { useRouter } from 'next/router'
import React from 'react'
import { Dialog } from 'ui'
import { SubscribeInline } from '..'

interface StandoutContext {}

const StandoutContext = React.createContext<StandoutContext | undefined>(
  undefined,
)

const StandoutProvider = ({ children }: { children: React.ReactNode }) => {
  const { query } = useRouter()

  const Standout = React.useCallback(() => {
    if (!query.standout) {
      return null
    }
    switch (query.standout) {
      case 'contact_success':
        return (
          <Dialog size="lg">
            <Dialog.Icon />
            <Dialog.Title>We&apos;ll be in touch right away</Dialog.Title>
            <Dialog.Content>
              <Dialog.ContentText>
                <p>
                  Subscribe to receive The latest news, articles, and resources,
                  sent to your inbox weekly.
                </p>
              </Dialog.ContentText>
            </Dialog.Content>
            <Dialog.Actions>
              <SubscribeInline className="m-auto" centered />
            </Dialog.Actions>
          </Dialog>
        )
      default:
        return null
    }
  }, [query.standout])

  return (
    <StandoutContext.Provider value={undefined}>
      <Standout />
      {children}
    </StandoutContext.Provider>
  )
}

export default StandoutProvider
