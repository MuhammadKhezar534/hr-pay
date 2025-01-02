import React, { FC } from 'react'
import { IconProps } from 'src/utilities'

const Logout: FC<IconProps> = ({ width = 24, height = 24, fill = '#5557D4' }) => {
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M17.6885 8.00284L21.8001 11.9967L17.6885 15.991'
        stroke={fill}
        strokeWidth='1.7'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M21.1664 11.9968L6.20874 11.9968'
        stroke={fill}
        strokeWidth='1.7'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13.1157 23L4.11569 23C3.01112 23 2.11569 22.1046 2.11569 21L2.11569 3C2.11569 1.89543 3.01112 1 4.11569 1L13.1157 1'
        stroke={fill}
        strokeWidth='1.7'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default Logout
