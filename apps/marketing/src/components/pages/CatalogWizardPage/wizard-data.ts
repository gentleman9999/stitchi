interface Fit {
  id: string
  label: string
}

export interface Style {
  type: 'style'
  id: string
  label: string
  fits: Fit[]
}

interface BaseCategory {
  type: 'category'
  id: string
  label: string
}

interface CategoryWithStyles extends BaseCategory {
  styles: Style[]
}

interface CategoryWithChildren extends BaseCategory {
  children: (Category | Style)[]
}

export type Category = CategoryWithStyles | CategoryWithChildren

export const categories: Category[] = [
  {
    type: 'category',
    id: 'tops',
    label: 'Tops',
    children: [
      {
        type: 'category',
        id: 'tee',
        label: 'T-Shirt',
        styles: [
          {
            type: 'style',
            id: 'short-sleeve',
            label: 'Short Sleeve',
            fits: [
              {
                id: 'regular',
                label: 'Regular',
              },
              {
                id: 'slim',
                label: 'Slim',
              },
              {
                id: 'oversized',
                label: 'Oversized',
              },
            ],
          },
          {
            type: 'style',
            id: 'long-sleeve',
            label: 'Long Sleeve',
            fits: [],
          },
          {
            type: 'style',
            id: 'tank-top',
            label: 'Tank Top',
            fits: [],
          },
        ],
      },
      {
        type: 'category',
        id: 'sweatshirt-or-fleece',
        label: 'Sweatshirt or Fleece',
        styles: [
          {
            type: 'style',
            id: 'hooded',
            label: 'Hooded',
            fits: [],
          },
          {
            type: 'style',
            id: 'crewneck',
            label: 'Crewneck',
            fits: [],
          },
          {
            type: 'style',
            id: 'zips',
            label: 'Zips',
            fits: [],
          },
        ],
      },
      {
        type: 'category',
        id: 'polo',
        label: 'Polo',
        styles: [
          {
            type: 'style',
            id: 'short-sleeve',
            label: 'Short Sleeve',
            fits: [],
          },
          {
            type: 'style',
            id: 'long-sleeve',
            label: 'Long Sleeve',
            fits: [],
          },
        ],
      },
    ],
  },

  {
    type: 'category',
    id: 'bottoms',
    label: 'Bottoms',
    children: [
      {
        type: 'category',
        id: 'sweatpants',
        label: 'Sweatpants',
        styles: [],
      },
    ],
  },

  {
    type: 'category',
    id: 'headwear',
    label: 'Headwear',
    children: [
      {
        type: 'category',
        id: 'hats',
        label: 'Hats',
        styles: [
          {
            type: 'style',
            id: 'structured',
            label: 'Structured',
            fits: [],
          },
          {
            type: 'style',
            id: 'unstructured',
            label: 'Unstructured',
            fits: [],
          },
          {
            type: 'style',
            id: 'fitted',
            label: 'Fitted',
            fits: [],
          },
          {
            type: 'style',
            id: 'adjustable',
            label: 'Adjustable',
            fits: [],
          },
          {
            type: 'style',
            id: 'bucket',
            label: 'Bucket',
            fits: [],
          },
        ],
      },
      {
        type: 'style',
        id: 'beanies',
        label: 'Beanies',
        fits: [],
      },
      {
        type: 'style',
        id: 'visors',
        label: 'Visors',
        fits: [],
      },
      {
        type: 'category',
        id: 'other',
        label: 'Other',
        styles: [],
      },
    ],
  },

  {
    type: 'category',
    id: 'accessories',
    label: 'Accessories',
    styles: [],
  },
]
