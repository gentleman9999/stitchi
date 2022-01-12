import dayjs from 'dayjs'

export const humanizeDate = (date: Date, config?: { short?: boolean }) => {
  return dayjs(date).format(config?.short ? 'MMM D, YYYY' : 'MMMM D, YYYY')
}
