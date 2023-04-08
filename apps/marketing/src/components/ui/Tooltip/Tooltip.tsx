import React from 'react'
import * as RuiTooltip from '@radix-ui/react-tooltip'

interface Props {
  label: string
  renderTrigger: () => React.ReactNode
  delay?: number
  side?: RuiTooltip.TooltipContentProps['side']
  align?: RuiTooltip.TooltipContentProps['align']
}

const Tooltip = (props: Props) => {
  return (
    <RuiTooltip.Provider delayDuration={props.delay}>
      <RuiTooltip.Root>
        <RuiTooltip.Trigger asChild>{props.renderTrigger()}</RuiTooltip.Trigger>
        <RuiTooltip.Portal>
          <RuiTooltip.Content
            side={props.side}
            align={props.align}
            sideOffset={4}
            collisionPadding={4}
          >
            <div className="max-w-xs text-xs bg-gray-800 text-white opacity-90 p-2 rounded-md w-full">
              {props.label}
            </div>
          </RuiTooltip.Content>
        </RuiTooltip.Portal>
      </RuiTooltip.Root>
    </RuiTooltip.Provider>
  )
}

export default Tooltip
