import { Section } from '@components/common'
import React from 'react'

interface Props {}

const DesignPageProcess = ({}: Props) => {
  return (
    <Section gutter="lg">
      <div className="flex flex-col items-center">
        <span className="uppercase text tracking-tight font-bold text-purple-500">
          Process
        </span>
        <h2 className="text-4xl font-bold text-gray-800 tracking-tight mt-2">
          Create designs people love
        </h2>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl text-center">
          Work 1x1 with a designer to create stunning promotional products for
          your merch campaigns. Receive designs in 1-2 days.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-20">
        <Step
          title="Submit a design request"
          content="Describe your design requirements, from single products to entire collections."
        />
        <Step
          title="Designer does the work"
          content="Get paired with an expert designer that specializes in your design style."
        />
        <Step
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
}: {
  title: string
  content: React.ReactNode
}) => {
  return (
    <div className="">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-gray-500 text-lg mt-2">{content}</p>
    </div>
  )
}

export default DesignPageProcess
