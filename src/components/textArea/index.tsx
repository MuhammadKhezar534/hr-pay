import React, { FC } from 'react'
import { Input as AInput } from 'antd'

interface InputProps {
  placeholder?: string
  name: string
  value?: string
  label?: string
  onChange?: any
  rows?: number
  error?: string
  maxLength?: number
  required?: boolean
}

const Input: FC<InputProps> = ({ value, error, placeholder, maxLength = 500, rows, name, onChange }) => {
  return (
    <div className='text-area pb-16'>
      <AInput.TextArea
        value={value}
        name={name}
        maxLength={maxLength}
        showCount={true}
        placeholder={placeholder}
        rows={rows}
        onChange={(e) => {
          const { name, value } = e.target
          onChange(value, name)
        }}
      />
      {error && <div className='error'>{error}</div>}
    </div>
  )
}

export default Input
