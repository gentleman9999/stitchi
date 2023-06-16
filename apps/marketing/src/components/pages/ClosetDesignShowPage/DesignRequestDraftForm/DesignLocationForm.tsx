import { InputGroup, TextField } from '@components/ui'
import React from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import FileInput from '../FileInput'

const locations = ['Front', 'Front Breast', 'Back', 'Sleeve', 'Other']

interface Props {}

const DesignLocationForm = (props: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <InputGroup label="Choose a design location">
        <RadioGroup.Root
          defaultValue={locations[0]}
          className="inline-flex gap-2 py-1"
        >
          {locations.map(location => (
            <RadioGroup.Item
              key={location}
              value={location}
              className="py-2 px-4 rounded-md border text-sm font-semibold focus:outline outline-gray-700 focus:border-gray-700 focus:bg-gray-700 focus:text-white outline-offset-2"
            >
              {location}
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>
      </InputGroup>

      <InputGroup label="Describe your design">
        <TextField multiline placeholder="Be descriptive..." />
      </InputGroup>

      <InputGroup
        optional
        label={
          <>
            Add reference images{' '}
            <span className="text-gray-400">(logos, inspiration, etc...)</span>
          </>
        }
      >
        <FileInput />
      </InputGroup>
    </div>
  )
}

export default DesignLocationForm
