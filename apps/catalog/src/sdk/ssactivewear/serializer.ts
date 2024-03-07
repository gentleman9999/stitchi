import {
  SsActivewearCategoryApiSchema,
  SsActivewearProductApiSchema,
  SsActivewearStyleApiSchema,
  SsActivewearWarehouseApiSchema,
} from "./api-schema";
import {
  SsActivewearCategory,
  SsActivewearProduct,
  SsActivewearProductVariant,
  SsActivewearWarehouse,
} from "./types";

export const makeCategory = (
  category: SsActivewearCategoryApiSchema
): SsActivewearCategory => {
  return {
    id: category.categoryID,
    name: category.name,
  };
};

export const makeProduct = (
  product: SsActivewearStyleApiSchema
): SsActivewearProduct => {
  return {
    styleId: product.styleID,
    partNumber: product.partNumber,
    brandName: product.brandName,
    styleName: product.styleName,
    title: product.title,
    description: product.description,
    baseCategory: product.baseCategory,
    categoryIds: product.categories,
    catalogPageNumber: product.catalogPageNumber,
    newStyle: product.newStyle,
    comparableGroup: product.comparableGroup,
    companionGroup: product.companionGroup,
    brandImage: product.brandImage,
    styleImage: product.styleImage,
    sustainableStyle: product.sustainableStyle,
  };
};

export const makeWarehouse = (
  warehouse: SsActivewearWarehouseApiSchema
): SsActivewearWarehouse => {
  return {
    warehouseAbbr: warehouse.warehouseAbbr,
    skuID: warehouse.skuID,
    qty: warehouse.qty,
    closeout: warehouse.closeout,
    dropship: warehouse.dropship,
    excludeFreeFreight: warehouse.excludeFreeFreight,
    fullCaseOnly: warehouse.fullCaseOnly,
    returnable: warehouse.returnable,
  };
};

export const makeProductVariant = (
  productVariant: SsActivewearProductApiSchema
): SsActivewearProductVariant => {
  return {
    brandName: productVariant.brandName,
    caseHeight: productVariant.caseHeight,
    caseLength: productVariant.caseLength,
    caseQty: productVariant.caseQty,
    caseWeight: productVariant.caseWeight,
    caseWidth: productVariant.caseWidth,
    color1: productVariant.color1,
    color2: productVariant.color2,
    colorBackImage: productVariant.colorBackImage,
    colorCode: productVariant.colorCode,
    colorDirectSideImage: productVariant.colorDirectSideImage,
    colorFamily: productVariant.colorFamily,
    colorFamilyID: productVariant.colorFamilyID,
    colorFrontImage: productVariant.colorFrontImage,
    colorGroup: productVariant.colorGroup,
    colorGroupName: productVariant.colorGroupName,
    colorName: productVariant.colorName,
    colorOnModelBackImage: productVariant.colorOnModelBackImage,
    colorOnModelFrontImage: productVariant.colorOnModelFrontImage,
    colorOnModelSideImage: productVariant.colorOnModelSideImage,
    colorPriceCodeName: productVariant.colorPriceCodeName,
    colorSideImage: productVariant.colorSideImage,
    colorSwatchImage: productVariant.colorSwatchImage,
    colorSwatchTextColor: productVariant.colorSwatchTextColor,
    countryOfOrigin: productVariant.countryOfOrigin,
    gtin: productVariant.gtin,
    noeRetailing: productVariant.noeRetailing,
    PolyPackQty: productVariant.PolyPackQty,
    piecePrice: productVariant.piecePrice,
    inventoryQty: productVariant.qty,
    saleExpiration: productVariant.saleExpiration,
    sizeCode: productVariant.sizeCode,
    sizeName: productVariant.sizeName,
    sizeOrder: productVariant.sizeOrder,
    sizePriceCodeName: productVariant.sizePriceCodeName,
    sku: productVariant.sku,
    skuID_Master: productVariant.skuID_Master,
    styleID: productVariant.styleID,
    styleName: productVariant.styleName,
    unitWeight: productVariant.unitWeight,
    casePrice: productVariant.casePrice,
    customerPrice: productVariant.customerPrice,
    dozenPrice: productVariant.dozenPrice,
    mapPrice: productVariant.mapPrice,
    salePrice: productVariant.salePrice,
    warehouses: productVariant.warehouses.map(makeWarehouse),
  };
};
