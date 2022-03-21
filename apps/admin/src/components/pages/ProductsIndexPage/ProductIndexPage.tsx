import React from 'react'
import { useRouter } from 'next/router'
import {
  Typography,
  DataGrid,
  DataGridProps,
  Container,
  Chip,
} from '@components/ui'
import routes from 'lib/routes'
import { useQuery, gql } from '@apollo/client'
import {
  ProductsIndexPageGetCatalogQuery,
  ProductsIndexPageGetCatalogQuery_catalog_products_nodes_categories,
} from '@generated/ProductsIndexPageGetCatalogQuery'
import { notEmpty } from '@utils/typescript'
import { GridRenderCellParams } from '@mui/x-data-grid'

const columns: DataGridProps['columns'] = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'primaryVendor', headerName: 'Primary Vendor', width: 150 },
  { field: 'manufacturer', headerName: 'Manufacturer', width: 150 },
  {
    field: 'categories',
    headerName: 'Categories',
    flex: 1,
    renderCell: ({
      value,
    }: GridRenderCellParams<
      ProductsIndexPageGetCatalogQuery_catalog_products_nodes_categories[]
    >) => {
      return value.map(category => (
        <Chip
          key={category.id}
          size="small"
          label={category.breadcrumbs?.map(b => b.name).join(' ➝ ')}
        />
      ))
    },
  },
]

const ProductsIndexPage = () => {
  const router = useRouter()
  const { data } = useQuery<ProductsIndexPageGetCatalogQuery>(GET_CATALOG)

  const products = data?.catalog?.products?.nodes ?? []

  const rows = products.filter(notEmpty).map(p => ({
    id: p.id,
    name: p.name,
    primaryVendor: p.vendor?.name,
    manufacturer: p.manufacturer?.name,
    categories: p.categories,
  }))

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Products
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        onRowClick={row =>
          router.push(routes.internal.products.show(row.id.toString()))
        }
      />
    </Container>
  )
}

const GET_CATALOG = gql`
  query ProductsIndexPageGetCatalogQuery($filter: CatalogProductsFilterInput) {
    catalog {
      id
      products(first: 100, filter: { categoryIds: $categoryIds }) {
        nodes {
          id
          name
          vendor {
            id
            name
          }
          manufacturer {
            id
            name
          }
          categories {
            id
            breadcrumbs {
              id
              name
            }
          }
        }
      }
    }
  }
`

export default ProductsIndexPage
