import { Transition as HuiTransition } from '@headlessui/react'
import CustomTransitionBase from './CustomTransitionBase'

interface CustomTransitionProps {
  children: React.ReactNode
  durationIn?: number
  durationOut?: number
  as?: any
}

const ScaleUp = ({
  durationIn = 300,
  durationOut = 200,
  ...rest
}: CustomTransitionProps) => (
  <CustomTransitionBase
    durationIn={durationIn}
    durationOut={durationOut}
    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    enterTo="opacity-100 translate-y-0 sm:scale-100"
    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    {...rest}
  />
)

const FadeOpacity = ({
  durationIn = 300,
  durationOut = 200,
  ...rest
}: CustomTransitionProps) => (
  <CustomTransitionBase
    durationIn={durationIn}
    durationOut={durationOut}
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
    {...rest}
  />
)

const SlideUp = ({
  durationIn = 2000,
  durationOut = 1500,
  ...rest
}: CustomTransitionProps) => (
  <CustomTransitionBase
    durationIn={durationIn}
    durationOut={durationOut}
    enterFrom="transition transform translate-y-[500px]"
    enterTo="transition transform translate-y-0"
    leaveFrom="transition transform translate-y-0"
    leaveTo="transition transform translate-y-[500px]"
    {...rest}
  />
)

const Transition: any = {}
Transition.Root = HuiTransition.Root
Transition.Child = HuiTransition.Child
Transition.ScaleUp = ScaleUp
Transition.FadeOpacity = FadeOpacity
Transition.SlideUp = SlideUp

export default Transition
