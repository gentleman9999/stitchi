import React from 'react'
import styles from './CardCollapsableContent.module.css'
import * as Collapsible from '@radix-ui/react-collapsible'

interface Props {
  children: React.ReactNode
}

const CardCollapsableContent = (props: Props) => {
  return (
    <Collapsible.Content className={styles.CollapsibleContent}>
      {props.children}
    </Collapsible.Content>
  )
}

export default CardCollapsableContent
