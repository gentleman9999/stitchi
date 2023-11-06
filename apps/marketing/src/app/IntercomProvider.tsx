'use client'

import { track } from '@lib/analytics'
import getOrThrow from '@lib/utils/get-or-throw'
import { usePathname } from 'next/navigation'
import { IntercomProvider as RUIProvider } from 'react-use-intercom'

const INTERCOM_APP_ID = getOrThrow(
  process.env.NEXT_PUBLIC_INTERCOM_APP_ID,
  'NEXT_PUBLIC_INTERCOM_APP_ID',
)

const IntercomProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  return (
    <RUIProvider
      appId={INTERCOM_APP_ID}
      autoBoot={true}
      onShow={() => {
        track.supportChatOpened({
          locationHref: pathname || window.location.href,
        })
      }}
    >
      {children}
    </RUIProvider>
  )
}

export default IntercomProvider
