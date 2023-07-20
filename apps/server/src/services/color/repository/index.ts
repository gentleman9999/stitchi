import { makeCreateColor } from './create-color'
import { makeGetColor } from './get-color'
import { makeListColors } from './list-color'
import { makeUpdateColor } from './update-color'

export interface ColorRepositoryInit {}

export interface ColorRepository {
  createColor: ReturnType<typeof makeCreateColor>
  getColor: ReturnType<typeof makeGetColor>
  listColors: ReturnType<typeof makeListColors>
  updateColor: ReturnType<typeof makeUpdateColor>
}

type MakeColorRepositoryFn = (init?: ColorRepositoryInit) => ColorRepository

const makeColorRepository: MakeColorRepositoryFn = init => ({
  createColor: makeCreateColor(),
  getColor: makeGetColor(),
  listColors: makeListColors(),
  updateColor: makeUpdateColor(),
})

export default makeColorRepository
