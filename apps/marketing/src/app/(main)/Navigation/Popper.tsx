'use client'

import React from 'react'
import { usePopper as useReactPopper } from 'react-popper'
import PopperProvider from './PopperContext'
import { useNavigation } from './NavigationContext'

const showEvents = ['click', 'mouseenter', 'focus']
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

  const { setExpanded: setNavigationExpanded } = useNavigation()

  const show = React.useCallback(() => {
    if (popperRef) {
      popperRef.setAttribute('data-show', 'true')

      update?.()

      setNavigationExpanded(true)
    }
  }, [update, popperRef, setNavigationExpanded])

  const hide = React.useCallback(() => {
    if (popperRef) {
      popperRef.removeAttribute('data-show')

      setNavigationExpanded(false)
    }
  }, [popperRef, setNavigationExpanded])

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
      showEvents.forEach(event => {
        popperRef.addEventListener(event, show)
      })

      hideEvents.forEach(event => {
        popperRef.addEventListener(event, hide)
      })
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
        showEvents.forEach(event => {
          popperRef.removeEventListener(event, show)
        })

        hideEvents.forEach(event => {
          popperRef.removeEventListener(event, hide)
        })
      }
    }
  }, [show, hide, triggerRef, popperRef])

  return (
    <PopperProvider show={show} hide={hide}>
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
        className="sr-only data-[show=true]:not-sr-only"
      >
        {props.Content}
      </div>
    </PopperProvider>
  )
}

export default Popper
