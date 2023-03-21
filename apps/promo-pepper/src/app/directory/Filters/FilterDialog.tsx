import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { XIcon } from 'icons'
import { Button, Container } from '@/components/ui'
import { FragmentType, getFragmentData, gql } from '@/__generated__'

interface Props {
  open: boolean
  onOpenChange: (b: boolean) => void
  categories?:
    | FragmentType<typeof FilterDialogDirectoryGategoriesFragment>[]
    | null
}

export default function FilterDialog({
  open,
  onOpenChange,
  categories,
}: Props) {
  if (!open) {
    return null
  }

  return (
    <Dialog.Root modal open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed top-0 left-0 bottom-0 right-0 bg-gray-900 opacity-50 grid place-items-center overflow-y-auto z-50" />
        <div className="fixed top-0 left-0 bottom-0 right-0 grid place-items-center overflow-y-auto z-50">
          <Container>
            <Dialog.Content className="bg-paper min-w-[300px] max-h-[90vh] rounded-md flex flex-col">
              <div className="flex-shrink-0 flex-grow-0">
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
              </div>

              {categories?.length ? (
                <div className="flex-1 overflow-y-scroll">
                  {categories.map(categoryFragment => {
                    const category = getFragmentData(
                      FilterDialogDirectoryGategoriesFragment,
                      categoryFragment,
                    )

                    if (!category.title) return null
                    return (
                      <Section key={category.id}>
                        <SectionTitle title={category.title} />
                        <br />
                        <CheckboxFilterGroup
                          name={category.title}
                          category={categoryFragment}
                        />
                      </Section>
                    )
                  })}
                </div>
              ) : null}

              <div className="flex-shrink-0 flex-grow-0">
                <hr />
                <Section>
                  <Button>Show x+ products</Button>
                </Section>
              </div>
            </Dialog.Content>
          </Container>
        </div>
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

const CheckboxFilterGroup = (props: {
  name: string
  category?: FragmentType<typeof FilterDialogDirectoryGategoriesFragment> | null
}) => {
  const category = getFragmentData(
    FilterDialogDirectoryGategoriesFragment,
    props.category,
  )

  if (!category?.children?.length) {
    return null
  }

  return (
    <fieldset>
      <legend className="sr-only">{props.name}</legend>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-5 gap-x-10">
        {category.children?.map(child => {
          if (!child?.title) return null

          return (
            <div key={child.id} className="relative flex items-start">
              <div className="flex h-6 items-center">
                <input
                  id={child.id}
                  name={child.id}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
              <div className="ml-3">
                <label
                  htmlFor="comments"
                  className="text-sm font-medium leading-6 text-gray-900"
                >
                  {child.title}
                </label>
                <p id="comments-description" className="text-sm text-gray-500">
                  {child.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </fieldset>
  )
}

export const FilterDialogDirectoryGategoriesFragment = gql(/* GraphQL */ `
  fragment FilterDialogDirectoryGategoriesFragment on GlossaryCategoryRecord {
    id
    title
    description
    children {
      id
      title
      description
    }
  }
`)
