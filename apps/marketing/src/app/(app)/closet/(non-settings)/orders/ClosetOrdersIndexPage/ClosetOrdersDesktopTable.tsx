import React from 'react'
import OrderPaymentStatusBadge from '../../../../../../components/common/OrderPaymentStatusBadge'
import routes from '@lib/routes'
import { parseISO } from 'date-fns'
import currency from 'currency.js'
import { gql } from '@apollo/client'
import InfiniteScrollContainer from '../../../../../../components/common/InfiniteScrollContainer'
import {
  Table,
  TableBody,
  TableCell,
  TableDateCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@components/ui/Table'
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
} from '@tanstack/react-table'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'
import {
  ClosetOrdersDesktopTableOrderFragment,
  MembershipRole,
} from '@generated/types'
import { useAuthorizedComponent } from '@lib/auth'
import OrderStatusTemporaryBadge from '@components/common/OrderStatusTemporaryBadge'

type Order = ClosetOrdersDesktopTableOrderFragment

const columnHelper = createColumnHelper<Order>()

interface Props {
  orders: Order[]
  hasNextPage?: boolean
  onNextPage: () => Promise<void> | void
}

const ClosetOrdersDesktopTable = ({
  orders,
  hasNextPage,
  onNextPage,
}: Props) => {
  const { role } = useAuthorizedComponent()
  const router = useRouter()

  const columns = React.useMemo(
    () => [
      columnHelper.accessor('createdAt', {
        header: () => <div className="text-left">Date</div>,
        cell: ({ row }) => (
          <TableDateCell date={parseISO(row.original.createdAt)} />
        ),
      }),

      columnHelper.accessor('humanOrderId', {
        header: () => <div className="text-left">ID</div>,
        cell: ({ getValue }) => <span className="text-sm">{getValue()}</span>,
      }),

      columnHelper.accessor('organization.name', {
        id: 'organization',
        header: () => <div className="text-left">Organization</div>,
        cell: ({ getValue }) => <span className="text-sm">{getValue()}</span>,
      }),

      columnHelper.accessor('totalPriceCents', {
        header: () => <div className="text-left">Total</div>,
        cell: ({ row }) => (
          <div>
            <div className="text-sm">
              {currency(row.original.totalPriceCents, {
                fromCents: true,
              }).format()}
            </div>

            <div className="text-gray-500 text-xs font-light">
              {currency(row.original.totalTaxCents, {
                fromCents: true,
              }).format()}{' '}
              tax
            </div>
          </div>
        ),
      }),

      columnHelper.accessor('paymentStatus', {
        header: () => <div className="text-left">Payment status</div>,
        cell: ({ row }) => (
          <OrderPaymentStatusBadge
            humanStatus={row.original.humanPaymentStatus}
            status={row.original.paymentStatus}
            size="small"
          />
        ),
      }),

      columnHelper.accessor('statusTemporary', {
        header: () => <div className="text-left">Fulfillment Status</div>,
        cell: ({ row }) => (
          <OrderStatusTemporaryBadge
            size="small"
            humanStatus={row.original.humanStatusTemporary}
            status={row.original.statusTemporary}
          />
        ),
      }),

      columnHelper.display({
        id: 'actions',
        cell: () => (
          <div className="flex justify-end">
            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
          </div>
        ),
      }),
    ],
    [],
  )

  const table = useReactTable<Order>({
    columns,
    data: orders,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility: {
        organization: Boolean(
          role &&
            [
              MembershipRole.STITCHI_ADMIN,
              MembershipRole.STITCHI_DESIGNER,
            ].includes(role),
        ),
      },
    },
  })

  const handleNextPage = async () => {
    await onNextPage()
  }

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <TableHeaderCell key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHeaderCell>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map(row => (
          <TableRow
            key={row.id}
            onClick={() => {
              router.push(
                routes.internal.closet.orders.show.href({
                  orderId: row.original.id,
                }),
              )
            }}
          >
            {row.getVisibleCells().map(cell => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>

      {hasNextPage ? (
        <InfiniteScrollContainer onIntersect={handleNextPage} />
      ) : null}
    </Table>
  )
}

ClosetOrdersDesktopTable.fragments = {
  order: gql`
    fragment ClosetOrdersDesktopTableOrderFragment on Order {
      id
      humanOrderId
      paymentStatus
      statusTemporary
      humanStatusTemporary
      humanPaymentStatus
      totalTaxCents
      totalPriceCents
      createdAt
      organization {
        id
        name
      }
    }
  `,
}

export default ClosetOrdersDesktopTable
