import TableFilterDate, {
  TableFilterDateProps,
} from '@components/ui/Table/TableFilterDate'
import TableFilters from '@components/ui/Table/TableFilters'
import TableFilterUser from '@components/ui/Table/TableFilterUser'
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
      <TableFilterUser label="Owner" value={null} onChange={() => {}} />
      <TableFilterDate label="Date modified" value={date} onChange={setDate} />
    </TableFilters>
  )
}

export default ClosetFilters
