import { Transition } from '@headlessui/react'
import { Fragment } from 'react'

interface Props {
  durationIn: number
  durationOut: number
  as?: any
  enterFrom?: string
  enterTo?: string
  leaveFrom?: string
  leaveTo?: string
  appear?: boolean
}

const CustomTransitionBase: React.FC<Props> = props => {
  const {
    durationIn,
    durationOut,
    as = Fragment,
    appear = true,
    ...rest
  } = props
  return (
    <Transition.Child
      as={Fragment}
      appear={appear}
      enter={`ease-out duration-${durationIn}`}
      leave={`ease-in duration-${durationOut}`}
      {...rest}
    />
  )
}

export default CustomTransitionBase
