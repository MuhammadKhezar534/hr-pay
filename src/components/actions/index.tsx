import React, { FC } from 'react'
import { Edit, Recycle } from './../../assets/icons'

import styles from './index.module.scss'

interface props {
  id: string
  onClick: (type: 'isDelete' | 'isEdit', id: string) => void
}

const Actions: FC<props> = ({ onClick, id }) => {
  return (
    <div className='d-flex gap-8'>
      <div className={`${styles.btn} cursor-pointer`} onClick={() => onClick('isEdit', id)}>
        <Edit />
      </div>
      <div className={`${styles.btn} cursor-pointer`} onClick={() => onClick('isDelete', id)}>
        <Recycle height='16px' width='16px' />
      </div>
    </div>
  )
}

export default Actions
