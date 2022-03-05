import React from 'react'
import { useRouter } from 'next/router'
import { Typography, DataGrid, DataGridProps, Container } from '@components/ui'
import routes from 'lib/routes'
import { makeProduct } from '../ProductShowPage'

const rows: DataGridProps['rows'] = Array.from(new Array(10)).map((_, i) =>
  makeProduct(i),
)

const columns: DataGridProps['columns'] = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: 'Name' },
  { field: 'primaryVendor', headerName: 'Primary Vendor', width: 150 },
  { field: 'manufacturer', headerName: 'Manufacturer', width: 150 },
  { field: 'categories', headerName: 'Categories', width: 200 },
]

const ProductsIndexPage = () => {
  const router = useRouter()

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Products
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        onRowClick={(row: typeof rows[number]) =>
          router.push(routes.interal.products.show(row.id))
        }
      />
    </Container>
  )
}

export default ProductsIndexPage
