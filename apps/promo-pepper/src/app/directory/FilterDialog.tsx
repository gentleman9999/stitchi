import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { XIcon } from 'icons'
import { Button } from '@/components/ui'

interface Props {
  open: boolean
  onOpenChange: (b: boolean) => void
}

export default function FilterDialog({ open, onOpenChange }: Props) {
  if (!open) {
    return null
  }

  return (
    <Dialog.Root modal open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal className="z-50">
        <Dialog.Overlay className="fixed top-0 left-0 bottom-0 right-0 bg-gray-900 opacity-10 grid place-items-center overflow-y-auto" />
        {/* <Container> */}
        <div className="fixed top-0 left-0 bottom-0 right-0 grid place-items-center overflow-y-auto">
          <Dialog.Content className="bg-paper min-w-[300px] rounded-md">
            <Section>
              <div className="flex justify-center relative">
                <Dialog.Close className="absolute top-0 left-0">
                  <XIcon height={24} />
                </Dialog.Close>
                <Dialog.Title className="text-xl font-semibold font-heading text-gray-700">
                  Filters
                </Dialog.Title>
              </div>
            </Section>
            <hr />
            <Section>
              <SectionTitle title="Supply chain" />
              <br />
              <CheckboxFilterGroup name="Supply chain" />
            </Section>
            <hr />
            <Section>
              <SectionTitle title="Product types" />
              <br />
              <CheckboxFilterGroup name="Product types" />
            </Section>
            <hr />
            <Section>
              <Button>Show x+ products</Button>
            </Section>
          </Dialog.Content>
        </div>

        {/* </Container> */}
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const Section = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6">{children}</div>
)

const SectionTitle = ({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) => {
  return (
    <div className="flex flex-col gap-2 font-heading">
      <h2 className="text-xl font-semibold">{title}</h2>
      {subtitle && <p className="text-sm">{subtitle}</p>}
    </div>
  )
}

const CheckboxFilterGroup = ({ name }: { name: string }) => {
  return (
    <fieldset>
      <legend className="sr-only">{name}</legend>
      <div className="space-y-5">
        <div className="relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="comments"
              aria-describedby="comments-description"
              name="comments"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </div>
          <div className="ml-3">
            <label
              htmlFor="comments"
              className="text-sm font-medium leading-6 text-gray-900"
            >
              Comments
            </label>
            <p id="comments-description" className="text-sm text-gray-500">
              Get notified when someones posts a comment on a posting.
            </p>
          </div>
        </div>
        <div className="relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="candidates"
              aria-describedby="candidates-description"
              name="candidates"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </div>
          <div className="ml-3">
            <label
              htmlFor="candidates"
              className="text-sm font-medium leading-6 text-gray-900"
            >
              Candidates
            </label>
            <p id="candidates-description" className="text-sm text-gray-500">
              Get notified when a candidate applies for a job.
            </p>
          </div>
        </div>
        <div className="relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="offers"
              aria-describedby="offers-description"
              name="offers"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </div>
          <div className="ml-3">
            <label
              htmlFor="offers"
              className="text-sm font-medium leading-6 text-gray-900"
            >
              Offers
            </label>
            <p id="offers-description" className="text-sm text-gray-500">
              Get notified when a candidate accepts or rejects an offer.
            </p>
          </div>
        </div>
      </div>
    </fieldset>
  )
}
