import React, { FC } from 'react'

import styles from './index.module.scss'

interface TitleProps {
  label?: string
}

const Title: FC<TitleProps> = ({ label }) => {
  return <div className={styles.title}>{label}</div>
}

export default Title
