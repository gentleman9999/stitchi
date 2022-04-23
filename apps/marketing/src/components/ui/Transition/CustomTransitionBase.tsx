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
}

const CustomTransitionBase: React.FC<Props> = props => {
  const { durationIn, durationOut, as = Fragment, ...rest } = props
  return (
    <Transition.Child
      as={Fragment}
      enter={`ease-out duration-${durationIn}`}
      leave={`ease-in duration-${durationOut}`}
      {...rest}
    />
  )
}

export default CustomTransitionBase
