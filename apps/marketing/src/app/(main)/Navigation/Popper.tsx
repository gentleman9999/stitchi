'use client'

import React from 'react'
import { usePopper as useReactPopper } from 'react-popper'
import PopperProvider from './PopperContext'

const showEvents = ['mouseenter', 'focus']
const hideEvents = ['mouseleave', 'blur']

interface Props {
  Trigger: React.ReactElement
  Content: React.ReactNode
}

const Popper = (props: Props) => {
  const [triggerRef, setTriggerRef] = React.useState<HTMLButtonElement | null>(
    null,
  )
  const [popperRef, setPopperRef] = React.useState<HTMLDivElement | null>(null)
  const { styles, attributes, update } = useReactPopper(triggerRef, popperRef, {
    strategy: 'absolute',
    placement: 'bottom-start',
  })

  const show = React.useCallback(() => {
    if (popperRef) {
      popperRef.setAttribute('data-show', 'true')

      update?.()
    }
  }, [update, popperRef])

  const hide = React.useCallback(() => {
    if (popperRef) {
      popperRef.removeAttribute('data-show')
    }
  }, [popperRef])

  React.useEffect(() => {
    if (triggerRef) {
      showEvents.forEach(event => {
        triggerRef.addEventListener(event, show)
      })

      hideEvents.forEach(event => {
        triggerRef.addEventListener(event, hide)
      })
    }

    if (popperRef) {
      popperRef.addEventListener('mouseenter', show)
      popperRef.addEventListener('mouseleave', hide)
    }

    return () => {
      if (triggerRef) {
        showEvents.forEach(event => {
          triggerRef.removeEventListener(event, show)
        })

        hideEvents.forEach(event => {
          triggerRef.removeEventListener(event, hide)
        })
      }

      if (popperRef) {
        popperRef.removeEventListener('mouseenter', show)
        popperRef.removeEventListener('mouseleave', hide)
      }
    }
  }, [show, hide, triggerRef, popperRef])

  return (
    <PopperProvider open={open} close={close}>
      {React.cloneElement(props.Trigger, {
        ref: setTriggerRef,
        id: 'button',
        'aria-describedby': 'dropdown',
      })}

      <div
        ref={setPopperRef}
        id="dropdown"
        role="navigation"
        style={styles.popper}
        {...attributes.popper}
        className="pt-2 hidden data-[show=true]:block"
      >
        <div className="bg-white shadow-sm rounded-sm">{props.Content}</div>
      </div>
    </PopperProvider>
  )
}

export default Popper
