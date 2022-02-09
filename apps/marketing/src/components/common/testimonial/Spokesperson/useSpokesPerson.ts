import { SpokespersonProps } from '.'
import jennyHeadshot from '../../../../../public/customers/morning_brew/jenny_rothenberg_morning_brew.jpg'

type Spokesperson = 'jenny_rothenberg'

const spokesPersonProps: Record<Spokesperson, SpokespersonProps> = {
  jenny_rothenberg: {
    name: 'Jenny Rothenberg',
    title: 'Director of Growth',
    headshot: jennyHeadshot,
  },
}

const useSpokesperson = (spokesPersonKey: Spokesperson) => {
  return spokesPersonProps[spokesPersonKey]
}

export { useSpokesperson }
