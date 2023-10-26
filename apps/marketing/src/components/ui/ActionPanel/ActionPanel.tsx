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
  image?: React.ReactNode
  Container?: React.ComponentType<{ children?: React.ReactNode }>
}

const ActionPanel = ({
  title,
  description,
  action,
  hide,
  image,
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
                <div className="flex flex-col @md:flex-row text-center @md:text-left items-center gap-6">
                  {image ? <div className="shrink-0">{image}</div> : null}
                  <div className="max-w-3xl">
                    <CardTitle title={title} subtitle={description} />
                  </div>
                  <div className="shrink-0 flex-1 flex @md:justify-end">
                    {action}
                  </div>
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
