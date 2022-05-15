import { Section } from '@components/common'
import React from 'react'
import DesignPageSectionHeader from './DesignPageSectionHeader'

interface Props {}

const DesignPageProcess = ({}: Props) => {
  return (
    <Section gutter="lg">
      <DesignPageSectionHeader
        pretitle="Design Process"
        title="Create designs people love"
        subtitle="Work 1x1 with a designer to create stunning promotional products for
          your merch campaigns. Receive designs in 1-2 days."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-20">
        <Step
          position={1}
          title="Submit a design request"
          content="Describe your design requirements, from single products to entire collections."
        />
        <Step
          position={2}
          title="Designer does the work"
          content="Get paired with an expert designer that specializes in your design style."
        />
        <Step
          position={3}
          title="Receive expertly crafted design"
          content="Your ideas come to life. We'll revise your designs as many times as needed."
        />
      </div>
    </Section>
  )
}

const Step = ({
  content,
  title,
  position,
}: {
  position: number
  title: string
  content: React.ReactNode
}) => {
  return (
    <div className="max-w-sm sm:max-w-none flex flex-col md:block items-center m-auto text-center sm:text-left">
      <span className="text-4xl text-primaryAlt-300 rounded-full ring ring-primaryAlt-300 w-14 h-14 flex justify-center items-center">
        {position}
      </span>
      <h3 className="text md:text-lg font-semibold text-gray-700 mt-6">
        {title}
      </h3>
      <p className="text-gray-500 text md:text-lg mt-2">{content}</p>
    </div>
  )
}

export default DesignPageProcess
