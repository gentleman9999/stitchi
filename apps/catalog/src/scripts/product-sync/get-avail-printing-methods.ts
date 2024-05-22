import { productCategorySummaryList } from './avail-printing-methods';

export enum EmbellishmentType {
    SCREENPRINTING = 'screen printing',
    EMBROIDERY = 'embroidery',
    HEATTRANSFER = 'heattransfer',
}

export interface categoryInfo {
    id: number;
    parent_id: number;
    name: string;
    avail_printing_methods: EmbellishmentType[];
}

export const getAvailPrintingMethods = async (categoryIds: number[], productTitle: string) => {
    const APPAREL = 24;
    // const ACCESSORIES = 33;
    // const HOMEGOODS = 514;

    let availPrintingMethods:EmbellishmentType[] = [];

    if(categoryIds.includes(APPAREL)) {
        availPrintingMethods = [ EmbellishmentType.SCREENPRINTING, EmbellishmentType.EMBROIDERY, EmbellishmentType.HEATTRANSFER];
    } else {
        const lastCategoryId = categoryIds.at(-1);
        const categoryInfo = productCategorySummaryList.find(item => item.id === lastCategoryId)
        if(categoryInfo) {
            availPrintingMethods = categoryInfo.avail_printing_methods
        }
    }

    return availPrintingMethods;
}
  