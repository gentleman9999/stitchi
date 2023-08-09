import { gql, useQuery } from '@apollo/client'
import useFeatureFlags from '@components/hooks/useFeatureFlags'
import { ClosetLayoutGetDataQuery } from '@generated/ClosetLayoutGetDataQuery'
import React from 'react'
import SideBar from './SideBar'
import Script from 'next/script'
import { Container } from '@components/ui'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'

interface Props {
  children: React.ReactNode
}

const ClosetLayout = (props: Props) => {
  const [{ isBetaTester }, { loading: flagsLoading }] = useFeatureFlags()
  const { data, loading: dataLoading } =
    useQuery<ClosetLayoutGetDataQuery>(GET_DATA)

  return (
    <div className="flex">
      <SideBar
        membershp={data?.viewer}
        loading={dataLoading || flagsLoading}
        logoutOnly={!isBetaTester}
      />
      <div className="ml-64 overflow-auto flex items-center w-full">
        {!flagsLoading && !isBetaTester ? (
          <div className="w-full">
            <Container>
              <ClosetPageHeader>
                <ClosetPageTitle
                  title="Stitchi Beta Access Request"
                  description={
                    <>
                      At Stitchi, we prioritize the quality of our service above
                      all. As we&apos;re in our beta phase, we&apos;re limiting
                      the number of customers we onboard to ensure that every
                      user benefits from an unparalleled experience, and to
                      guarantee that we can scale effectively. By filling out
                      this access form, you&apos;re expressing interest in being
                      part of an exclusive group that gets to experience
                      Stitchi&apos;s offerings firsthand. Your submission will
                      be thoughtfully reviewed, and we&apos;ll reach out as we
                      expand our capacity. Join us in this journey and help
                      shape the future of Stitchi.
                    </>
                  }
                />
              </ClosetPageHeader>
              <ClosetSection>
                <br />
                <div
                  data-tf-widget="uFnzT21G"
                  data-tf-opacity="100"
                  data-tf-iframe-props="title=Request Access Form"
                  data-tf-transitive-search-params
                  data-tf-medium="snippet"
                  style={{ width: '100%', height: '500px' }}
                />
              </ClosetSection>
            </Container>
            <Script
              src="//embed.typeform.com/next/embed.js"
              strategy="lazyOnload"
            />
          </div>
        ) : (
          props.children
        )}
      </div>
    </div>
  )
}

const GET_DATA = gql`
  ${SideBar.fragments.membership}
  query ClosetLayoutGetDataQuery {
    viewer {
      id
      ...SideBarMembershipFragment
    }
  }
`

export default ClosetLayout
