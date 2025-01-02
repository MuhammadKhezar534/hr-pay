import React, { FC } from 'react'

import styles from './index.module.scss'

interface StatsProps {
  icon: any
  label: string
  value: string
  background: string
}

const Stats: FC<StatsProps> = ({ icon, label, value, background }) => {
  return (
    <div className={`d-flex align-items-center gap-16 ${styles.container}`}>
      <div
        className={styles.icon}
        style={{
          background: background,
        }}
      >
        {icon}
      </div>
      <div>
        <span className='medium'>{label}</span>
        <h4>{value}</h4>
      </div>
    </div>
  )
}

export default Stats
