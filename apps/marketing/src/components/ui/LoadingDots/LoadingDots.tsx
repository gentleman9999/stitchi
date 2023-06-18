import s from './LoadingDots.module.css'
import cx from 'classnames'

const Dot = ({ className }: { className?: string }) => (
  <span className={cx(s.dot, className)} />
)

const LoadingDots = ({ dotClassName }: { dotClassName?: string }) => {
  return (
    <span className={s.root}>
      {Array.from({ length: 3 }).map((_, i) => (
        <Dot key={i} className={dotClassName} />
      ))}
    </span>
  )
}

export default LoadingDots
