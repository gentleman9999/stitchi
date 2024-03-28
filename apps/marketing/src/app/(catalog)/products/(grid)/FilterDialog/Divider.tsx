import cx from 'classnames'

const Divider = ({ className }: { className?: string }) => {
  return <div className={cx('border-t', className)} />
}

export default Divider
