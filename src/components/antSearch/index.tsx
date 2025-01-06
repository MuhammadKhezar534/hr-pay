import React, { FC } from 'react'
import { Input } from 'antd'

import './index.scss'

const { Search } = Input

interface props {
  onSearch: (value: any) => void
  loading?: boolean
}

const AntSearch: FC<props> = ({ onSearch, loading }) => {
  return (
    <div className='emp-search'>
      <Search placeholder='Search Employee' loading={loading} onSearch={onSearch} enterButton />
    </div>
  )
}

export default AntSearch
