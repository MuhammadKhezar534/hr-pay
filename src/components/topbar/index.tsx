import React from 'react'
import { Layout } from 'antd'
import { useNavigate } from 'react-router-dom'

import ResponsiveMenu from '../../components/responsive-menu'
import useScreenSize from './../../hooks/useScreenSize'
import styles from './index.module.scss'

const { Header } = Layout

const Topbar: React.FC = () => {
  const screenSize = useScreenSize()
  const navigate = useNavigate()

  return (
    <Header
      className=' header'
      style={{
        position: 'fixed',
        zIndex: 6,
        width: '100%',
        height: '128px',
        background: '#FFFFFF',
        border: '1px solid #E1E5E8',
        paddingInline: '24px',
      }}
    >
      <div className={`layout ${styles.topbarGrid}`}>
        {screenSize === 'md' && (
          <span className={`${styles.logo}`}>
            <img
              onClick={() => navigate('/')}
              src='/assets/RPB_logo.svg'
              height='72px'
              className='ml-8 cursor-pointer'
            />
          </span>
        )}
        {screenSize === 'sm' || screenSize === 'xs' ? <ResponsiveMenu /> : ''}
        <div>{screenSize === 'md' ? <span className={styles.routeName}> Dashboard</span> : ''}</div>
        <div className={styles.avatarGrid}>
          <div className={styles.avatar}>
            <img src='/icons/hr.svg' height='31px' alt='' />
          </div>
          {screenSize !== 'xs' && (
            <div>
              <div className={styles.name}>hr Solution</div>
              <div className={styles.designation}>HR Admin</div>
            </div>
          )}
        </div>
      </div>
    </Header>
  )
}

export default Topbar
