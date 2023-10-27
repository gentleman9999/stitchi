import React from 'react'
import cx from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { SlideOverProvider, useSlideOver } from './slide-over-context'

interface Props {
  children: React.ReactNode
  className?: string
}

const SlideOver = ({ children, className }: Props) => {
  const { open } = useSlideOver()
  return (
    <AnimatePresence>
      {open ? (
        <div>
          <motion.div
            initial={{ translateX: '100%' }}
            animate={{ translateX: '0%' }}
            exit={{ translateX: '100%' }}
            className={cx(
              'z-10 fixed right-0 top-[56px] bottom-0 bg-paper border-l  w-full sm:w-auto sm:max-w-[90vw] flex flex-col shadow-xl',
              className,
            )}
          >
            {children}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}

const withSlideOverContext = (Component: React.ComponentType<Props>) => {
  const SlideOverWithContext = (
    props: Props & {
      open: boolean
      onOpenChange: (open: boolean) => void
    },
  ) => {
    const { open, onOpenChange, ...rest } = props
    return (
      <SlideOverProvider onOpenChange={onOpenChange} open={open}>
        <Component {...rest} />
      </SlideOverProvider>
    )
  }

  return SlideOverWithContext
}

export default withSlideOverContext(SlideOver)
