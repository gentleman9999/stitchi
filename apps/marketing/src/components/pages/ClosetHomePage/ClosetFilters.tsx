import TableFilterDate, {
  TableFilterDateProps,
} from '@components/ui/Table/TableFilterDate'
import TableFilters from '@components/ui/Table/TableFilters'
import React from 'react'

interface Filters {
  date: TableFilterDateProps['value'] | null
}

interface Props {
  onChange: (values: Filters) => void
}

const ClosetFilters = ({ onChange }: Props) => {
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

export default ClosetFilters
