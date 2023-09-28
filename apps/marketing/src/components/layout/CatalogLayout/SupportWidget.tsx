import UserAvatar from '@components/common/UserAvatar'
import Button from '@components/ui/ButtonV2/Button'
import { SUPPORT_PERSON_NAME, SUPPORT_PERSON_PICTURE } from '@lib/constants'
import React from 'react'
import * as Popover from '@radix-ui/react-popover'
import {
  ChevronDownIcon,
  QuestionMarkCircleIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline'
import s from './SupportWidget.module.css'
import Link from 'next/link'
import routes from '@lib/routes'

interface Props {
  defaultOpen?: boolean
}

const SupportWidget = ({ defaultOpen = false }: Props) => {
  return (
    <Popover.Root defaultOpen={defaultOpen}>
      <Popover.Trigger className="fixed z-10 bottom-6 right-6 group">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shrink-0 shadow-magical relative">
          <div className="group-data-[state=open]:scale-0 transition-all absolute">
            <QuestionMarkCircleIcon className="w-6 h-6" />
          </div>
          <div className="group-data-[state=closed]:scale-0 transition-all absolute">
            <ChevronDownIcon className="w-6 h-6" />
          </div>
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="top"
          align="end"
          collisionPadding={16}
          sideOffset={16}
          className={s.PopoverContent}
        >
          <div className="flex flex-col items-start">
            <div className="flex flex-col sm:flex-row items-center gap-4 p-6">
              <div className="p-0.5 w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                <UserAvatar
                  width="w-10"
                  height="h-10"
                  user={{
                    name: SUPPORT_PERSON_NAME,
                    picture: SUPPORT_PERSON_PICTURE,
                  }}
                />
              </div>
              <p className="text-center sm:text-left">
                Choose a product from the catalog you want to customize.
              </p>
            </div>

            <hr className="w-full" />

            <div className="flex gap-4 p-4 justify-center w-full flex-wrap">
              <Button
                variant="ghost"
                size="lg"
                endIcon={<BookOpenIcon className="w-4 h-4" />}
                className="whitespace-nowrap flex-1"
                Component={Link}
                href={routes.external.support.href()}
                {...{ target: '_blank' }}
              >
                Knowledge base
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="whitespace-nowrap flex-1"
                endIcon={<ChatBubbleLeftRightIcon className="w-4 h-4" />}
                Component={Link}
                href={routes.external.support.href()}
                {...{ target: '_blank' }}
              >
                Live chat
              </Button>
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default SupportWidget
