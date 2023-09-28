import { gql, useMutation, useQuery } from '@apollo/client'
import UserAvatar from '@components/common/UserAvatar'
import { Dialog } from '@components/ui'
import Button from '@components/ui/ButtonV2/Button'
import { ClosetDesignRequestShowPageGetViewerDataQuery } from '@generated/ClosetDesignRequestShowPageGetViewerDataQuery'
import {
  DesignOnboardingDialogUpdateOnboardingMutation,
  DesignOnboardingDialogUpdateOnboardingMutationVariables,
} from '@generated/DesignOnboardingDialogUpdateOnboardingMutation'
import { PaintBrushIcon } from '@heroicons/react/20/solid'
import {
  COMPANY_NAME,
  COMPANY_SUPPORT_EMAIL,
  SUPPORT_PERSON_NAME,
  SUPPORT_PERSON_PICTURE,
} from '@lib/constants'
import { queryTypes, useQueryState } from 'next-usequerystate'
import React from 'react'

interface Props {}

const DesignOnboardingDialog = ({}: Props) => {
  const [showOnboarding, setShowOnboarding] = useQueryState(
    'onboarding',
    queryTypes.boolean.withDefault(false),
  )

  const { data, loading } =
    useQuery<ClosetDesignRequestShowPageGetViewerDataQuery>(GET_VIEWER_DATA)

  const [updateOnboarding] = useMutation<
    DesignOnboardingDialogUpdateOnboardingMutation,
    DesignOnboardingDialogUpdateOnboardingMutationVariables
  >(UPDATE_ONBOARDING, {
    update(cache, { data }) {
      const userOnboarding = data?.userOnboardingUpdate?.userOnboarding

      if (userOnboarding) {
        cache.evict({ id: cache.identify({ ...userOnboarding }) })
        cache.gc()
      }
    },
  })

  const hasSeenOnboarding =
    loading || data?.viewer?.user?.onboarding?.seenDesignRequestDraftOnboarding

  React.useEffect(() => {
    if (!hasSeenOnboarding) {
      setShowOnboarding(true)

      updateOnboarding({
        variables: {
          input: {
            seenDesignRequestDraftOnboarding: true,
          },
        },
      })
    }
  }, [hasSeenOnboarding, setShowOnboarding, updateOnboarding])

  const handleClose = () => {
    setShowOnboarding(null)
  }

  if (!showOnboarding) return null

  return (
    <Dialog
      mobileFullScreen
      open
      onClose={handleClose}
      onOpenAutoFocus={e => e.preventDefault()}
    >
      <Dialog.Title>
        <Dialog.Close />
      </Dialog.Title>
      <Dialog.Content>
        <div className="flex flex-col items-center gap-8">
          <UserAvatar
            width="w-16"
            height="h-16"
            user={{
              name: SUPPORT_PERSON_NAME,
              picture: SUPPORT_PERSON_PICTURE,
            }}
          />
          <div className="prose prose-sm">
            <p>
              Hey there 👋 I&apos;m Everest, founder of {COMPANY_NAME} -
              Congratulations on selecting a product for your first design!
            </p>
            <p>
              Next, you&apos;ll have an opportunity to share your design ideas
              and upload any reference files. One of our expert designers will
              then bring your vision to life.
            </p>
            <p>
              Once your design is perfect, you&apos;ll be able to turn it into
              quality branded merchandise, fulfilled effortless wherever your
              audience is. But that&apos;s just that start...
            </p>
            <p>
              If you have any questions or want to provide feedback, click the
              support link in the navigation or drop me a line directly at{' '}
              <a
                href={`mailto:${COMPANY_SUPPORT_EMAIL}`}
                className="underline"
                target="_blank"
              >
                {COMPANY_SUPPORT_EMAIL}
              </a>
              . We thank you for the opportunity to serve you - now enjoy for
              exploring!
            </p>
          </div>

          <Button
            size="xl"
            onClick={handleClose}
            variant="ghost"
            endIcon={<PaintBrushIcon className="w-4 h-4" />}
          >
            Start designing
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  )
}

const GET_VIEWER_DATA = gql`
  query ClosetDesignRequestShowPageGetViewerDataQuery {
    viewer {
      id
      user {
        id
        onboarding {
          id
          seenDesignRequestDraftOnboarding
        }
      }
    }
  }
`

const UPDATE_ONBOARDING = gql`
  mutation DesignOnboardingDialogUpdateOnboardingMutation(
    $input: UserOnboardingUpdateInput!
  ) {
    userOnboardingUpdate(input: $input) {
      userOnboarding {
        id
      }
    }
  }
`

export default DesignOnboardingDialog
