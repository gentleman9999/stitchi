import cx from 'classnames'

const SectionHeading = ({
  number,
  children,
  className,
  ...props
}: {
  number: string
  children: React.ReactNode
  className?: string
}) => {
  return (
    <h2
      className={cx(
        className,
        'inline-flex items-center rounded-full px-4 py-1 text-primary ring-1 ring-inset ring-primary',
      )}
      {...props}
    >
      <span className="font-mono text-sm" aria-hidden="true">
        {number.padStart(2, '0')}
      </span>
      <span className="ml-3 h-3.5 w-px bg-blue-600/20" />
      <span className="ml-3 text-base font-medium tracking-tight">
        {children}
      </span>
    </h2>
  )
}

interface Props {
  title: string
}

export default SectionHeading
