import React, { FC } from 'react'

import styles from './index.module.scss'

interface props {
  label: number
}

const Badge: FC<props> = ({ label }) => {
  return <div className={styles.badge}>{label}</div>
}

export default Badge
