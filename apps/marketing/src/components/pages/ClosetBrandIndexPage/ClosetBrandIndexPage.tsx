import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionTitle from '@components/common/ClosetSectionTitle'
import { FileInput, InputGroup } from '@components/ui'
import React from 'react'
import color from 'color'

interface Props {}

const ClosetBrandIndexPage = () => {
  return (
    <ClosetPageContainer>
      <ClosetPageHeader>
        <ClosetPageTitle title="Brand" />
      </ClosetPageHeader>

      <ClosetSection>
        <ClosetSectionHeader>
          <ClosetSectionTitle title="Logos" />
        </ClosetSectionHeader>

        <InputGroup>
          <FileInput
            fileIds={[]}
            folder=""
            onChange={() => {}}
            accept="image/*, application/pdf"
          />
        </InputGroup>
      </ClosetSection>

      <ClosetSection>
        <ClosetSectionHeader>
          <ClosetSectionTitle title="Colors" />
        </ClosetSectionHeader>

        <ul className="flex gap-4">
          {Array.from({ length: 4 }).map((_, i) => {
            const hex = getRandomColor()
            return (
              <li key={i} className="flex flex-col items-center">
                <div
                  className="w-36 h-36 rounded-md"
                  style={{
                    backgroundColor: hex,
                  }}
                />

                <span className="text-sm">{hex}</span>
              </li>
            )
          })}
        </ul>
      </ClosetSection>
    </ClosetPageContainer>
  )
}

function getRandomColor() {
  const randomChannel = () => Math.floor(Math.random() * 256)
  return color.rgb(randomChannel(), randomChannel(), randomChannel()).hex()
}

export default ClosetBrandIndexPage
