import { BigCommerceCategory } from '../../sdk'
import { BigCommerceProductCustomField } from '../../sdk/bigcommerce/types'

type CustomField = Omit<BigCommerceProductCustomField, 'id'> & {
  id: number | undefined
}

// These are the ID's of the parent of the custom fields we want to create.
const CUSTOM_FIELD_PARENT_IDS = [
  518, // Sleeve Length
  508, // Fit
  515, // Collar
  507, // Feature
  512, // Treatment
  509, // Thickness
  510, // Tag
  513, // Logo (visibility)
  517, // Gender
]

const makeGetCustomFieldsFromBigCommerceCategories = (
  allBigCommerceCategories: BigCommerceCategory[],
) => {
  const parentCategoryMap = new Map<number, BigCommerceCategory>()

  for (const category of allBigCommerceCategories) {
    if (CUSTOM_FIELD_PARENT_IDS.includes(category.id)) {
      parentCategoryMap.set(category.id, category)
    }
  }

  return function make(
    productCategoryIds: number[],
    currentCustomFields: BigCommerceProductCustomField[],
  ): CustomField[] {
    const fields: CustomField[] = []

    for (const categoryId of productCategoryIds) {
      const category = allBigCommerceCategories.find(c => c.id === categoryId)

      if (category) {
        const parentCategory = parentCategoryMap.get(category.parentId)

        if (parentCategory) {
          const existingCustomField = currentCustomFields.find(
            f => f.name === parentCategory.name && f.value === category.name,
          )

          fields.push({
            id: existingCustomField?.id,
            name: parentCategory.name,
            value: category.name,
          })
        }
      }
    }

    return fields
  }
}

export default makeGetCustomFieldsFromBigCommerceCategories
