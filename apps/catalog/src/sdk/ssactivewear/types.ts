export interface SsActivewearCategory {
  id: number
  name: string
}

export interface SsActivewearProduct {
  styleId: number
  partNumber: string
  brandName: string
  styleName: string
  title: string
  description?: string
  baseCategory: string
  categoryIds: number[]
  catalogPageNumber: string
  newStyle: boolean
  comparableGroup: number
  companionGroup: number
  brandImage?: string
  styleImage?: string
  sustainableStyle: boolean
}

export interface SsActivewearWarehouse {
  warehouseAbbr: string
  skuID: number
  qty: number
  closeout: boolean
  dropship: boolean
  excludeFreeFreight: boolean
  fullCaseOnly: boolean
  returnable: boolean
}

export interface SsActivewearProductVariant {
  sku: string
  gtin?: string
  skuID_Master: number
  styleID: number
  brandName: string
  styleName: string
  colorName: string
  colorCode: string
  colorPriceCodeName: string
  colorGroup: string
  colorGroupName: string
  colorFamilyID: string
  colorFamily: string
  colorSwatchImage?: string
  colorSwatchTextColor?: string
  colorFrontImage?: string
  colorSideImage?: string
  colorBackImage?: string
  colorDirectSideImage?: string
  colorOnModelFrontImage?: string
  colorOnModelSideImage?: string
  colorOnModelBackImage?: string
  color1?: string
  color2?: string
  sizeName: string
  sizeCode: string
  sizeOrder: string
  sizePriceCodeName: string
  caseQty: number
  unitWeight: number
  mapPrice?: number
  piecePrice: number
  dozenPrice?: number
  casePrice?: number
  salePrice?: number
  customerPrice: number
  saleExpiration?: Date | null
  noeRetailing: boolean
  caseWeight: number
  caseWidth: number
  caseLength: number
  caseHeight: number
  PolyPackQty?: string
  inventoryQty: number
  countryOfOrigin?: string
  warehouses: SsActivewearWarehouse[]
}
