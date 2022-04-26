import React, { Fragment } from 'react'
import cx from 'classnames'
import { Dialog as HuiDialog } from '@headlessui/react'
import DialogTitle from './DialogTitle'
import DialogIcon from './DialogIcon'
import DialogContent from './DialogContent'
import DialogContentText from './DialogContentText'
import DialogActions from './DialogActions'
import Transition from '../Transition'
import useBreakpoints from '@hooks/useBreakpoints'
import DialogSectionPadding from './DialogSectionPadding'

export interface DialogProps {
  open: boolean
  onClose: () => void
  children: ReturnType<
    | typeof DialogTitle
    | typeof DialogIcon
    | typeof DialogContent
    | typeof DialogActions
  >[]
  size?: 'sm' | 'md' | 'lg'
  className?: string
  mobileFullScreen?: boolean
  scroll?: 'paper'
}

const Dialog = (props: DialogProps) => {
  const { size = 'md', scroll = 'paper' } = props

  let Title: typeof DialogTitle | null = null
  let Icon: typeof DialogIcon | null = null
  let Content: typeof DialogContent | null = null
  let Actions: typeof DialogActions | null = null

  const { currentBreakpoint } = useBreakpoints()

  React.Children.forEach(props.children, child => {
    switch (child.type) {
      case DialogTitle:
        if (Title) {
          throw new Error('Dialog can only have one title')
        }
        Title = child as unknown as typeof DialogTitle
        break
      case DialogIcon:
        if (Icon) {
          throw new Error('Dialog can only have one icon')
        }
        Icon = child as unknown as typeof DialogIcon
        break
      case DialogContent:
        if (Content) {
          throw new Error('Dialog can only have one content')
        }
        Content = child as unknown as typeof DialogContent
        break
      case DialogActions:
        if (Actions) {
          throw new Error('Dialog can only have one actions')
        }
        Actions = child as unknown as typeof DialogActions
        break
      default:
        throw new Error(`Invalid child type: ${child.type}`)
    }
  })

  const DialogTransitionComponent =
    currentBreakpoint === 'xs' ? Transition.SlideUp : Transition.ScaleUp

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <HuiDialog
        as="div"
        className="fixed z-40 inset-0 overflow-y-auto"
        onClose={props.onClose}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 sm:p-0">
          <Transition.FadeOpacity>
            <HuiDialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.FadeOpacity>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <DialogTransitionComponent>
            <div
              className={cx(
                'align-bottom bg-white overflow-hidden shadow-xl transform transition-all sm:align-middle sm:w-full flex flex-col max-h-[93%]',
                {
                  'sm:max-w-sm': size === 'sm',
                  'sm:max-w-lg': size === 'md',
                  'sm:max-w-2xl': size === 'lg',
                  'flex my-8 mx-4 rounded-lg': !props.mobileFullScreen,
                  'absolute bottom-0 left-0 right-0 sm:right-auto sm:left-auto sm:bottom-auto sm:flex rounded-t-lg sm:rounded-lg sm:my-8':
                    Boolean(props.mobileFullScreen),
                },
                props.className,
              )}
            >
              {Icon}
              {Icon && <div className="mt-3 sm:mt-5" />}

              {Title && <DialogSectionPadding>{Title}</DialogSectionPadding>}
              {Content}
              {Actions && (
                <div className="">
                  <DialogSectionPadding>{Actions}</DialogSectionPadding>
                </div>
              )}
              <DialogSectionPadding />
            </div>
          </DialogTransitionComponent>
        </div>
      </HuiDialog>
    </Transition.Root>
  )
}

Dialog.Title = DialogTitle
Dialog.Icon = DialogIcon
Dialog.Content = DialogContent
Dialog.ContentText = DialogContentText
Dialog.Actions = DialogActions

export default Dialog
