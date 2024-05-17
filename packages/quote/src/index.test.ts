// index.test.ts
import { makeCalculate } from './index'
import { EmbellishmentType } from './shared'

describe('calculate', () => {
  const calculate = makeCalculate()

  it('2 screenprints, 1 embroideries', () => {
    const input = {
      includeFulfillment: false,
      printLocations: [
        { colorCount: 1, embellishmentType: EmbellishmentType.SCREENPRINTING },
        { colorCount: 1, embellishmentType: EmbellishmentType.SCREENPRINTING },
        { colorCount: 0, embellishmentType: EmbellishmentType.EMBROIDERY }
      ],
      variants: [
        {
            catalogProductId: '6593',
            catalogProductVariantId: '239598',
            quantity: 50,
            priceCents: 511
        },
        {
            catalogProductId: '6593',
            catalogProductVariantId: '239202',
            quantity: 100,
            priceCents: 511
        }
      ]
    }

    const [error, quote] = calculate(input)
    expect(error).toBeNull()
    expect(quote).not.toBeNull()
    expect(quote!.variants.length).toBe(2)
    expect(quote!.variants[0].unitCostCents).toBe(1126)
    expect(quote!.variants[0].unitRetailPriceCents).toBe(1585)
    expect(quote!.variants[0].totalRetailPriceCents).toBe(79270)
    expect(quote!.variants[1].unitCostCents).toBe(1126)
    expect(quote!.variants[1].unitRetailPriceCents).toBe(1585)
    expect(quote!.variants[1].totalRetailPriceCents).toBe(158540)
    expect(quote!.totalRetailPriceCents).toBe(237810)
    expect(quote!.unitRetailPriceCents).toBe(1585)
  })

  it('2 printscreens, 2 embroideries', () => {
    const input = {
      includeFulfillment: false,
      printLocations: [
        { colorCount: 1, embellishmentType: EmbellishmentType.SCREENPRINTING },
        { colorCount: 1, embellishmentType: EmbellishmentType.SCREENPRINTING },
        { colorCount: 0, embellishmentType: EmbellishmentType.EMBROIDERY },
        { colorCount: 0, embellishmentType: EmbellishmentType.EMBROIDERY }
      ],
      variants: [
        {
            catalogProductId: '6593',
            catalogProductVariantId: '239598',
            quantity: 50,
            priceCents: 511
        },
        {
          catalogProductId: '6593',
          catalogProductVariantId: '239598',
          quantity: 100,
          priceCents: 521
      },
        {
            catalogProductId: '6593',
            catalogProductVariantId: '239202',
            quantity: 200,
            priceCents: 531
        }
      ]
    }

    const [error, quote] = calculate(input)
    expect(error).toBeNull()
    expect(quote).not.toBeNull()
    expect(quote!.variants.length).toBe(3)
    expect(quote!.variants[0].unitCostCents).toBe(1381)
    expect(quote!.variants[0].unitRetailPriceCents).toBe(1879)
    expect(quote!.variants[0].totalRetailPriceCents).toBe(93956)
    expect(quote!.variants[1].unitCostCents).toBe(1391)
    expect(quote!.variants[1].unitRetailPriceCents).toBe(1892)
    expect(quote!.variants[1].totalRetailPriceCents).toBe(189273)
    expect(quote!.variants[2].unitCostCents).toBe(1401)
    expect(quote!.variants[2].unitRetailPriceCents).toBe(1906)
    expect(quote!.variants[2].totalRetailPriceCents).toBe(381266)
    expect(quote!.totalRetailPriceCents).toBe(664495)
    expect(quote!.unitRetailPriceCents).toBe(1892.3333333333333)
  })
})