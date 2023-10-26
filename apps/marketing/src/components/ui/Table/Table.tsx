import React from 'react'
import styles from './Table.module.css'

interface Props {
  children: React.ReactNode
}

const Table = ({ children }: Props) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className={styles.table}>{children}</table>
    </div>
  )
}

export default Table
