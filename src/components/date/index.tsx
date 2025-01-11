import React, { FC } from 'react'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import type { DatePickerProps } from 'antd'
import type { RangePickerProps } from 'antd/es/date-picker'
import moment from 'moment'

const monthFormat = 'MMM YYYY'
const dateFormat = 'DD MMM YYYY'

interface props {
  label?: string
  name?: string
  value?: string
  error?: string
  required?: boolean
  type: 'month' | 'date' | 'year'
  onChange?: DatePickerProps['onChange']
}

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  return current && current > dayjs().endOf('day')
}

const Date: FC<props> = ({ label, required = false, type, value, error, name, onChange }) => {
  value = value ? moment(value).format('DD MMM YYYY') : value

  return (
    <div className='dateWrapper'>
      <label className='label'>
        {label}
        {required && <span className='required'>*</span>}
      </label>
      <DatePicker
        format={type === 'date' ? 'DD MMM YYYY' : 'MMM YYYY'}
        allowClear={false}
        disabledDate={disabledDate}
        name={name}
        value={value ? (type === 'month' ? dayjs(value, monthFormat) : dayjs(value, dateFormat)) : null}
        suffixIcon={<img src='/icons/calendar.svg' />}
        onChange={onChange}
        picker={type}
      />
      {error && <div className='error'>{error}</div>}
    </div>
  )
}

export default Date
