import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { Card, CardHeader, CardTitle } from '../Card'

const fadeInOut = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
}

interface Props {
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  hide?: boolean
  Container?: React.ComponentType<{ children?: React.ReactNode }>
}

const ActionPanel = ({
  title,
  description,
  action,
  hide,
  Container = React.Fragment,
}: Props) => {
  return (
    <AnimatePresence mode="wait">
      {!hide && (
        <motion.div
          initial="hidden"
          animate="show"
          exit="exit"
          variants={fadeInOut}
        >
          <Container>
            <Card className="@container">
              <CardHeader>
                <div className="flex flex-col @md:flex-row @md:items-center gap-4 justify-between">
                  <div className="max-w-3xl">
                    <CardTitle title={title} subtitle={description} />
                  </div>
                  <div className="shrink-0">{action}</div>
                </div>
              </CardHeader>
            </Card>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ActionPanel
