import React, { FC, CSSProperties } from 'react'
import { Button as AntButton } from 'antd'

interface props {
  label: string
  disabled?: boolean
  loading?: boolean
  block?: boolean
  size?: 'small' | 'middle'
  type?: 'primary' | 'default' | 'link'
  background?: string
  color?: string
  className?: string
  style?: CSSProperties
  onClick?: () => void
}

const Button: FC<props> = ({
  label,
  disabled = false,
  block = false,
  onClick,
  loading,
  size = 'middle',
  type = 'primary',
  background = '',
  color = '',
  className,
  style,
}) => {
  return (
    <AntButton
      loading={loading}
      disabled={disabled}
      block={block}
      type={type}
      size={size}
      className={`btn-wrapper ${className}`}
      onClick={onClick}
      style={{
        background,
        color,
        minWidth: size === 'small' ? '80px' : '184px',
        height: size === 'small' ? '32px' : '48px',
        borderRadius: size === 'small' ? '28px' : '',
        ...style,
      }}
    >
      {label}
    </AntButton>
  )
}

export default Button
