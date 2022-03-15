import React from 'react'
import { useRouter } from 'next/router'
import { Typography, DataGrid, DataGridProps, Container } from '@components/ui'
import routes from 'lib/routes'
import { useQuery, gql } from '@apollo/client'
import { ProductsIndexPageGetCatalogQuery } from '@generated/ProductsIndexPageGetCatalogQuery'
import { notEmpty } from '@utils/typescript'

const columns: DataGridProps['columns'] = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: 'Name' },
  { field: 'primaryVendor', headerName: 'Primary Vendor', width: 150 },
  { field: 'manufacturer', headerName: 'Manufacturer', width: 150 },
  { field: 'categories', headerName: 'Categories', width: 200 },
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
    categories: [],
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
          router.push(routes.interal.products.show(row.id.toString()))
        }
      />
    </Container>
  )
}

const GET_CATALOG = gql`
  query ProductsIndexPageGetCatalogQuery {
    catalog {
      id
      products(first: 100) {
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
        }
      }
    }
  }
`

export default ProductsIndexPage
