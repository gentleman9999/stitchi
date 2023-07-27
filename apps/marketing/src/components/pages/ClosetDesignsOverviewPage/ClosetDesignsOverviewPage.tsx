import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import Button from '@components/ui/ButtonV2/Button'
import { SparklesIcon } from '@heroicons/react/20/solid'
import React from 'react'

interface Props {}

const ClosetDesignsOverviewPage = ({}: Props) => {
  return (
    <ClosetPageContainer>
      <div className="flex justify-center">
        <div className="mt-12 max-w-lg flex flex-col gap-8">
          <h1 className="text-4xl font-bold text-center">Designs</h1>
          <p className="text-center text-xl">
            Bring your ideas to life by starting with a design. Every design is
            uniquely crafted by one of our expert designers.
          </p>
          <div className="flex justify-center gap-2">
            <Button endIcon={<SparklesIcon className="w-4 h-4" />} size="xl">
              Create your first design
            </Button>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold">Meet our expert designers</h2>
            <div className="flex -space-x-2 overflow-hidden mt-4">
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                alt=""
              />
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </ClosetPageContainer>
  )
}

export default ClosetDesignsOverviewPage
