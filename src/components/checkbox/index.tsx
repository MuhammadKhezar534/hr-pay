import { Checkbox } from 'antd'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import React, { FC } from 'react'

interface checkBoxProps {
  optionType: 'individual' | 'agency'
  options: any
  defaultValues: any
  onChange: (checkedValues: CheckboxValueType[], optionType: 'individual' | 'agency') => void
}

const CheckboxGroup: FC<checkBoxProps> = ({ options, onChange, optionType, defaultValues }) => {
  const localOnChange = (options: CheckboxValueType[]) => {
    onChange(options, optionType)
  }
  return (
    <Checkbox.Group options={options} defaultValue={defaultValues} onChange={(options) => localOnChange(options)} />
  )
}

export default CheckboxGroup
