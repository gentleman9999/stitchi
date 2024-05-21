export enum EmbellishmentType {
    SCREENPRINTING = 'screen printing',
    EMBROIDERY = 'embroidery',
    HEATTRANSFER = 'heattransfer',
  }

export const getAvailPrintingMethods = (categoryIds: number[]) => {
    let availPrintingMethods:EmbellishmentType[] = [];
    if(categoryIds.includes(24)) {
        availPrintingMethods = [ EmbellishmentType.SCREENPRINTING, EmbellishmentType.EMBROIDERY, EmbellishmentType.HEATTRANSFER];
    } else {
        // TODO: Use OpenAI to determine this product's availPrintingMethods.
        availPrintingMethods = [];
    }

    return availPrintingMethods;
}
  