import React, { ReactElement } from 'react'
import { TextField } from '..'
import { Checkbox, CheckboxProps } from '../..'
import { useFuzzySearch } from 'hooks'

type CheckboxInput = React.ReactElement<typeof Checkbox>

type CheckedState = {
  value: CheckboxProps['value']
  checked: CheckboxProps['checked']
}[]

export interface CheckboxGroupProps {
  children: CheckboxInput[] | CheckboxInput
  enableSearch?: boolean
  onChange?: (...any: any) => any
}

const CheckboxGroup = (props: CheckboxGroupProps) => {
  const initialChildrenProps = React.useMemo(
    () =>
      React.Children.map(props.children, child => {
        if (!React.isValidElement<CheckboxProps>(child)) {
          throw new Error(`Invalid child element: ${child.type}`)
        }

        return (child as ReactElement<CheckboxProps>).props
      }),
    [props.children],
  )

  const fuzzySearchData = initialChildrenProps.map(props => ({
    name: props.name,
    label: props.label,
    description: props.description,
  }))

  const { term, search, result } = useFuzzySearch({ data: fuzzySearchData })

  const [checkedState, setCheckedState] = React.useState<CheckedState>(
    initialChildrenProps.map(({ checked, value }) => ({ checked, value })),
  )

  const handleChange = (index: number, checked: boolean) => {
    setCheckedState(prev => {
      let currentState = prev
      currentState[index] = { ...currentState[index], checked }
      return currentState
    })
  }

  React.useEffect(() => {
    console.log('CHANGED')
  }, [checkedState])

  const handleIsolateChecked = (index: number) => {
    setCheckedState(prev =>
      prev.map((value, i) => ({ ...value, checked: i === index })),
    )
  }

  const children = React.useMemo(
    () =>
      React.Children.map(props.children, (child, index) => {
        if (React.isValidElement<CheckboxProps>(child)) {
          if (child.type === Checkbox) {
            if (result.map(res => res.name).includes(child.props.name)) {
              return React.cloneElement<CheckboxProps>(
                child,
                {
                  ...child.props,
                  onChange: v => {
                    child.props.onChange?.(v)
                    handleChange(index, v)
                  },
                  checked: checkedState[index].checked,
                  onSecondaryAction: () => handleIsolateChecked(index),
                  showSecondaryAction:
                    checkedState[index].checked !== true ||
                    checkedState.filter(v => v).length > 1,
                },
                null,
              )
            }
          }
        }
      }),
    [checkedState, props.children, result],
  )

  return (
    <div>
      {props.enableSearch && (
        <div className="mb-4">
          <TextField
            name="search"
            value={term}
            multiline={false}
            placeholder="Search"
            onChange={e => search(e.target.value)}
          />
        </div>
      )}
      <ul className="flex flex-col gap-1">
        {children.map(child => (
          <li key={child.key}>{child}</li>
        ))}
      </ul>
    </div>
  )
}

export default CheckboxGroup
