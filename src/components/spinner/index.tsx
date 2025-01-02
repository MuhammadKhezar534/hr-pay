import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

const antIcon = <LoadingOutlined style={{ fontSize: 36 }} spin />

interface props {
  fullPage?: boolean
}

const Spinner: React.FC<props> = ({ fullPage }) => (
  <div className={fullPage ? 'spinnerFullPage' : 'text-center'}>
    <Spin indicator={antIcon} />
  </div>
)

export default Spinner
