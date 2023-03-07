import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Container } from '@/components/ui'
import { XIcon } from 'icons'

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
      <Dialog.Portal className="">
        <Dialog.Overlay className="fixed top-0 left-0 bottom-0 right-0 bg-gray-900 opacity-10 grid place-items-center overflow-y-auto" />
        {/* <Container> */}
        <div className="fixed top-0 left-0 bottom-0 right-0 grid place-items-center overflow-y-auto">
          <Dialog.Content className="bg-paper min-w-[300px] rounded-md">
            <Section>
              <div className="flex justify-center relative">
                <Dialog.Close className="absolute top-0 left-0">
                  <XIcon height={24} />
                </Dialog.Close>
                <Dialog.Title className="text-2xl">Filters</Dialog.Title>
              </div>
            </Section>
            <hr />
            <Section>New section</Section>
          </Dialog.Content>
        </div>

        {/* </Container> */}
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const Section = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4">{children}</div>
)
