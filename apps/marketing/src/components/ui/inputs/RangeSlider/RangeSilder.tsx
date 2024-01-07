import React from 'react'
import * as RSlider from '@radix-ui/react-slider'
import cx from 'classnames'
import TextField, { TextFieldProps } from '../TextField'

export interface RangeSliderProps {
  value: number
  min?: number
  max?: number
  step?: number
  className?: string
  inputClassName?: TextFieldProps['inputClassName']
  label?: TextFieldProps['label']
  onChange: (value: number) => void
  onPointerUp?: (e: React.MouseEvent) => void
  onPointerDown?: (e: React.MouseEvent) => void
  renderValue?: (value: number) => string
}

const RangeSlider = (props: RangeSliderProps) => {
  const [value, setValue] = React.useState(props.value)

  React.useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return (
    <div className={cx('relative', props.className)}>
      <TextField
        label={props.label}
        inputClassName={props.inputClassName}
        value={
          props.renderValue ? props.renderValue(value) : value.toLocaleString()
        }
        type="tel"
        onChange={e => {
          props.onChange(parseInt(e.target.value.replaceAll(',', '')) || 0)
        }}
      />

      <div className="absolute bottom-[1px] left-0 right-0">
        <RSlider.Root
          className="relative w-full flex items-center"
          value={[props.max ? Math.min(value, props.max) : value]}
          min={props.min}
          max={props.max}
          step={props.step}
          onValueChange={value => setValue(value[0])}
          onValueCommit={value => props.onChange(value[0])}
        >
          <RSlider.Track className="relative grow rounded h-[3px] bg-neutral-100">
            <RSlider.Range className="absolute rounded h-full" />
          </RSlider.Track>
          <RSlider.Thumb
            className="block w-4 h-4 bg-primary rounded-sm hover:cursor-pointer"
            onPointerUp={props.onPointerUp}
            onPointerDown={props.onPointerDown}
          />
        </RSlider.Root>
      </div>
    </div>
  )
}

export default RangeSlider
