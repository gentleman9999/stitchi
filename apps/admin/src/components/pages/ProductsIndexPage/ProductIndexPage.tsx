import React from 'react'
import { useRouter } from 'next/router'
import {
  Typography,
  DataGrid,
  DataGridProps,
  Container,
  Chip,
  Autocomplete,
  TextField,
  Grid,
} from '@components/ui'
import routes from 'lib/routes'
import { useQuery, gql } from '@apollo/client'
import {
  ProductsIndexPageGetCatalogQuery,
  ProductsIndexPageGetCatalogQueryVariables,
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
  const { categoryId } = router.query

  const { data } = useQuery<
    ProductsIndexPageGetCatalogQuery,
    ProductsIndexPageGetCatalogQueryVariables
  >(GET_CATALOG, {
    variables: {
      filter: {
        categoryId: {
          eq: categoryId?.toString() || undefined,
        },
      },
    },
  })

  const categories = data?.catalog?.categories
  const products = data?.catalog?.products?.nodes ?? []

  const rows = products.filter(notEmpty).map(p => ({
    id: p.id,
    name: p.name,
    primaryVendor: p.vendor?.name,
    manufacturer: p.manufacturer?.name,
    categories: p.categories,
  }))

  const addCategory = (id: string) => {
    router.push({
      query: {
        ...router.query,
        categoryId: id,
      },
    })
  }

  const removeCategory = () => {
    router.push({
      query: {
        ...router.query,
        categoryId: undefined,
      },
    })
  }

  const value = categories?.find(c => c.id === categoryId?.toString())

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Products
      </Typography>

      <Grid container spacing={1} sx={{ mb: 1 }}>
        <Grid item>
          {categories?.length && (
            <Autocomplete
              disablePortal
              size="small"
              getOptionLabel={option => option.name}
              options={categories}
              sx={{ width: 300 }}
              value={categories?.find(c => c.id === categoryId?.toString())}
              onChange={(_, value) =>
                value ? addCategory(value.id) : removeCategory()
              }
              renderInput={params => <TextField {...params} label="Category" />}
            />
          )}
        </Grid>
      </Grid>

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
  query ProductsIndexPageGetCatalogQuery($filter: CategoryFilterArg) {
    catalog {
      id
      categories {
        id
        name
        slug
        children {
          id
          name
          slug
        }
      }
      products(first: 100, filter: $filter) {
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
