import React, { Fragment } from 'react'
import cx from 'classnames'
import { Dialog as HuiDialog, Transition } from '@headlessui/react'
import DialogTitle from './DialogTitle'
import DialogIcon from './DialogIcon'
import DialogContent from './DialogContent'
import DialogContentText from './DialogContentText'
import DialogActions from './DialogActions'
import { Button } from '..'

export interface DialogProps {
  children: ReturnType<
    | typeof DialogTitle
    | typeof DialogIcon
    | typeof DialogContent
    | typeof DialogActions
  >[]
  size?: 'sm' | 'md' | 'lg'
}

const Dialog = (props: DialogProps) => {
  const { size = 'md' } = props
  const [open, setOpen] = React.useState(true)

  let Title = null
  let Icon = null
  let Content = null
  let Actions = null

  React.Children.forEach(props.children, child => {
    switch (child.type) {
      case DialogTitle:
        if (Title) {
          throw new Error('Dialog can only have one title')
        }
        Title = child
        break
      case DialogIcon:
        if (Icon) {
          throw new Error('Dialog can only have one icon')
        }
        Icon = child
        break
      case DialogContent:
        if (Content) {
          throw new Error('Dialog can only have one content')
        }
        Content = child
        break
      case DialogActions:
        if (Actions) {
          throw new Error('Dialog can only have one actions')
        }
        Actions = child
        break
      default:
        throw new Error(`Invalid child type: ${child.type}`)
    }
  })

  return (
    <Transition.Root show={open} as={Fragment}>
      <HuiDialog
        as="div"
        className="fixed z-40 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <HuiDialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={cx(
                'inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:p-6',
                {
                  'sm:max-w-sm': size === 'sm',
                  'sm:max-w-lg': size === 'md',
                  'sm:max-w-2xl': size === 'lg',
                },
              )}
            >
              <div>
                {Icon}
                <div className="mt-3 text-center sm:mt-5">
                  {Title}
                  <div className="mt-2">{Content}</div>
                </div>
              </div>
              {Actions}
            </div>
          </Transition.Child>
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
