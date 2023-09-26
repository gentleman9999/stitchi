import React from 'react'
import dynamic from 'next/dynamic'
import { queryTypes, useQueryState } from 'next-usequerystate'

import type { Props as ClosetLinkShareDialogProps } from './ClosetLinkShareDialog'

const ContactSuccessDialog = dynamic(() => import('./ContactSuccessDialog'))
const ClosetLinkShareDialog = dynamic(() => import('./ClosetLinkShareDialog'))
const OrganizationCreateDialog = dynamic(
  () => import('./OrganizationCreateDialog'),
)
const UserInviteDialog = dynamic(() => import('./UserInviteDialog'))
const HelpDialog = dynamic(() => import('./HelpDialog'))

export enum StandoutType {
  ContactSuccess = 'contact_success',
  ClosetLinkShare = 'closet_link_share',
  Help = 'help',
  OrganizationCreate = 'organization_create',
  UserInvite = 'user_invite',
}

interface BaseInput {
  type: StandoutType
}

interface ClosetLinkShareInput
  extends BaseInput,
    Omit<ClosetLinkShareDialogProps, 'open' | 'onClose'> {
  type: StandoutType.ClosetLinkShare
}

interface OrganizationCreateInput extends BaseInput {
  type: StandoutType.OrganizationCreate
  redirectUrl?: string
}

interface ContactSuccessInput extends BaseInput {
  type: StandoutType.ContactSuccess
}

interface HelpInput extends BaseInput {
  type: StandoutType.Help
}

interface UserInviteInput extends BaseInput {
  type: StandoutType.UserInvite
}

type SetStandoutInput =
  | ClosetLinkShareInput
  | OrganizationCreateInput
  | ContactSuccessInput
  | HelpInput
  | UserInviteInput

interface State {
  standout?: StandoutType | null
  setStandout: (input: SetStandoutInput) => void
}

const StandoutContext = React.createContext<State | undefined>(undefined)

const StandoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [standoutProps, setStandoutProps] =
    React.useState<SetStandoutInput | null>(null)

  const [standout, setStandout] = useQueryState<StandoutType>(
    'standout',
    queryTypes.stringEnum(Object.values(StandoutType)),
  )

  const handleSetStandout = (input: SetStandoutInput) => {
    setStandout(input.type, {
      scroll: false,
    })
    setStandoutProps(input)
  }

  const Standout = React.useCallback(() => {
    if (!standout) {
      return null
    }

    const props = {
      open: true,
      onClose: () =>
        setStandout(null, {
          scroll: false,
        }),
    }

    if (!standoutProps) return null

    switch (standoutProps.type) {
      case StandoutType.ContactSuccess:
        return <ContactSuccessDialog {...props} {...standoutProps} />
      case StandoutType.ClosetLinkShare:
        return <ClosetLinkShareDialog {...props} {...standoutProps} />
      case StandoutType.OrganizationCreate:
        return <OrganizationCreateDialog {...props} {...standoutProps} />
      case StandoutType.Help:
        return <HelpDialog {...props} {...standoutProps} />
      case StandoutType.UserInvite:
        return <UserInviteDialog {...props} {...standoutProps} />
    }
  }, [setStandout, standout, standoutProps])

  return (
    <StandoutContext.Provider
      value={{
        standout,
        setStandout: handleSetStandout,
      }}
    >
      <Standout />
      {children}
    </StandoutContext.Provider>
  )
}

const useStandout = () => {
  const context = React.useContext(StandoutContext)
  if (context === undefined) {
    throw new Error('useStandout must be used within a StandoutProvider')
  }
  return context
}

export { StandoutProvider, useStandout }
