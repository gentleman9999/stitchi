import { ColorRecord } from '../db/color-table'

export interface ColorFactoryColor extends ColorRecord {}

const colorFactory = ({
  colorRecord,
}: {
  colorRecord: ColorRecord
}): ColorFactoryColor => {
  return {
    id: colorRecord.id,

    hex: colorRecord.hex,
    name: colorRecord.name,

    cmykC: colorRecord.cmykC,
    cmykM: colorRecord.cmykM,
    cmykY: colorRecord.cmykY,
    cmykK: colorRecord.cmykK,

    pantone: colorRecord.pantone,
  }
}

export { colorFactory }
