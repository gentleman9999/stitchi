import React from 'react'
import * as Popover from '@radix-ui/react-popover'
import { QuestionMarkCircle } from 'icons'

interface Props {
  content: React.ReactNode
  side?: Popover.PopoverContentProps['side']
  align?: Popover.PopoverContentProps['align']
}

const MoreInformationPopover = (props: Props) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <i className="cursor-pointer">
          <QuestionMarkCircle width={16} />
        </i>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align={props.align}
          side={props.side}
          collisionPadding={4}
          sideOffset={4}
        >
          {props.content}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default MoreInformationPopover
