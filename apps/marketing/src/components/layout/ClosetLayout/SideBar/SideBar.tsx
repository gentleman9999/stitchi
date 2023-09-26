import React from 'react'
import { gql } from '@apollo/client'
import { SideBarMembershipFragment } from '@generated/SideBarMembershipFragment'
import PrimarySideBar from './PrimarySideBar'
import { useClosetLayoutContext } from '../closet-layout-context'
import SecondarySideBar from './SecondarySideBar'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'

interface Props {
  membership?: SideBarMembershipFragment | null
}

const SideBar = ({ membership }: Props) => {
  const { activeNavItem } = useClosetLayoutContext()

  const isSecondary =
    activeNavItem && 'type' in activeNavItem && activeNavItem.type === 'subnav'

  return (
    <>
      <AnimatePresence initial={false}>
        {isSecondary ? (
          <motion.div
            transition={{
              type: 'tween',
              ease: 'linear',
              duration: 0.1,
            }}
            initial={{
              x: '-100%',
            }}
            animate={{
              x: '0%',
            }}
            exit={{
              x: '-100%',
            }}
          >
            <SecondarySideBar />
          </motion.div>
        ) : (
          <PrimarySideBar membership={membership} />
        )}
      </AnimatePresence>
    </>
  )
}

SideBar.fragments = {
  membership: gql`
    ${PrimarySideBar.fragments.membership}
    fragment SideBarMembershipFragment on Membership {
      id
      ...PrimarySideBarMembershipFragment
    }
  `,
}

export default SideBar
