import routes from '@lib/routes'
import React from 'react'
import { animate, useInView } from 'framer-motion'
import LinkInline from '@components/ui/LinkInline'

const stats: Array<{
  label: string
  value: number
  duration: number
  format?: (v: number) => string
}> = [
  {
    label: 'Gained Subscribers',
    value: 75000,
    duration: 3,
    format: (v: number) =>
      v.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }),
  },
  {
    label: 'Lowered Customer Acquisition Cost',
    value: 29.4,
    duration: 1,
    format: v => v.toFixed(2) + '%',
  },
  {
    label: 'Brand evangelists',
    value: 8000,
    duration: 1.5,
    format: v =>
      v.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }),
  },
]

const StatsSection = () => {
  return (
    <div>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
        {stats.map(stat => (
          <div key={stat.label} className="border-t-2  pt-6">
            <dt className="text-base font-medium text-gray-500">
              {stat.label}
            </dt>
            <dd className="text-3xl font-extrabold tracking-tight text-gray-900">
              <Counter
                to={stat.value}
                format={stat.format}
                duration={stat.duration}
              />
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-10">
        <LinkInline href={routes.internal.getStarted.href()}>
          Learn how to level up your swag &nbsp; &rarr;
        </LinkInline>
      </div>
    </div>
  )
}

const Counter = ({
  to,
  duration,
  format,
}: {
  to: number
  duration: number
  format?: (v: number) => string
}) => {
  const nodeRef = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(nodeRef, { once: true })

  React.useEffect(() => {
    const node = nodeRef.current

    if (!node || !inView) {
      return
    }

    const controls = animate(0, to, {
      duration: duration,
      type: 'tween',
      ease: 'easeInOut',
      onUpdate(value) {
        node.textContent = format ? format(value) : value.toFixed(2)
      },
    })

    return () => controls.stop()
  }, [duration, format, inView, to])

  return <span ref={nodeRef} />
}

export default StatsSection
