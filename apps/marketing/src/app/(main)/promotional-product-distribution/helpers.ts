const FULFILLMENT_COST_IN_CENTS = 100 // $1
const MONTHLY_STORAGE_COST_IN_CUBIC_FEET = 100 // $1
const NUM_TSHIRTS_PER_CUBIC_FEET = 25

export const calculate = ({
  itemCount,
  storageDuration,
}: {
  itemCount: number
  storageDuration: number
}) => {
  const fulfillmentCostInCents = Math.round(
    itemCount * FULFILLMENT_COST_IN_CENTS,
  )
  const totalCubicFeet = Math.ceil(
    (itemCount / NUM_TSHIRTS_PER_CUBIC_FEET) * 1.0,
  )
  const storageCostInCentsPerMonth =
    totalCubicFeet * MONTHLY_STORAGE_COST_IN_CUBIC_FEET
  const dailyStorageCost = storageCostInCentsPerMonth / 30
  const storageCostInCents = Math.round(dailyStorageCost * storageDuration)

  return {
    fulfillmentCostInCents,
    storageCostInCents,
    totalCostInCents: fulfillmentCostInCents + storageCostInCents,
  }
}
