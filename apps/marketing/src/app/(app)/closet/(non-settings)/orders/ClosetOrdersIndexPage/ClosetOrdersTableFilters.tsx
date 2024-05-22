import React from 'react'
import TableFilterDate, {
  TableFilterDateProps,
} from '@components/ui/Table/TableFilterDate'
import TableFilters from '@components/ui/Table/TableFilters'

interface Filters {
  date: TableFilterDateProps['value'] | null
}

interface Props {
  onChange: (values: Filters) => void
}

const ClosetOrdersTableFilters = ({ onChange }: Props) => {
  const [date, setDate] = React.useState<TableFilterDateProps['value'] | null>(
    null,
  )

  React.useEffect(() => {
    onChange({ date })
  }, [date, onChange])

  return (
    <TableFilters>
      <TableFilterDate label="Date" value={date} onChange={setDate} />
    </TableFilters>
  )
}

export default ClosetOrdersTableFilters
