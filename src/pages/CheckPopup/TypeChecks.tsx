import React, { FC } from 'react'
import { CheckboxValueType } from 'antd/es/checkbox/Group'

import CheckboxGroup from './../../components/checkbox'
import './index.scss'

interface props {
  options: any
  title: string
  subTitle: string
  icon: string
  defaultValues: any[]
  optionType: 'individual' | 'agency'
  onChange: (checkedValues: CheckboxValueType[], optionType: 'individual' | 'agency') => void
}

const TypeChecks: FC<props> = ({ onChange, optionType, options, title, subTitle, icon, defaultValues }) => {
  return (
    <div className='border-contaner'>
      <img src={icon} />
      <div className='sb-t'>{title} </div>
      <div className='in-t'>{subTitle}</div>
      <CheckboxGroup options={options} onChange={onChange} defaultValues={defaultValues} optionType={optionType} />
    </div>
  )
}

export default TypeChecks
