import React from 'react'
import { gql } from '@apollo/client'
import { SideBarMembershipFragment } from '@generated/SideBarMembershipFragment'
import PrimarySideBar from './PrimarySideBar'
import { useClosetLayoutContext } from '../closet-layout-context'
import SecondarySideBar from './SecondarySideBar'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'

interface Props {
  loading: boolean
  membership?: SideBarMembershipFragment | null
}

const SideBar = ({ membership, loading }: Props) => {
  const { activeNavItem } = useClosetLayoutContext()

  const isSecondary =
    activeNavItem && 'type' in activeNavItem && activeNavItem.type === 'subnav'

  return (
    <nav className="fixed h-screen border-r bg-paper w-64">
      <AnimatePresence initial={false}>
        {isSecondary ? (
          <motion.div
            className="absolute inset-0 bg-paper z-10"
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
        ) : null}
      </AnimatePresence>

      <PrimarySideBar loading={loading} membership={membership} />
    </nav>
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
