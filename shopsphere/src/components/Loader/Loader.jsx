import React from 'react'
import styles from './Loader.module.scss'

function Loader() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner} />
    </div>
  )
}

export default Loader
