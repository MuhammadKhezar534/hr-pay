import React from 'react'
import { Layout } from 'antd'
import { Routes, Route, Navigate } from 'react-router-dom'

import { Topbar, Sidebar, NotFound } from '../../components/index'
import useScreenSize from './../../hooks/useScreenSize'
import { Dashboard } from '../../pages'
import { Profile } from '../../pages/index'
import ProfileListing from 'src/pages/profileListing'
import EmployeeListing from 'src/pages/employeeListing'

import styles from './index.module.scss'
import ViewProfile from 'src/pages/ViewProfile'

const { Content } = Layout

const Admin: React.FC = () => {
  const screenSize = useScreenSize()
  const loggedIn = localStorage.getItem('XAUTH')

  if (!loggedIn) {
    return <Navigate to='/login' />
  }

  return (
    <Layout className={styles.layoutWrapper}>
      <Topbar />
      <Content className={styles.content}>
        <Layout style={{ background: '#F8F9FF' }} className='py-24 layout'>
          {screenSize === 'md' && <Sidebar />}
          <Content className={`${styles.routerOutlet} ${screenSize === 'md' ? 'ml-100 px-16' : 'px-8'}`}>
            <Routes>
              <Route path='/'>
                <Route path='view-detail/:id' element={<ViewProfile />} />
                <Route path='create-profile/:id' element={<Profile />} />
                <Route path='profiles/:id' element={<ProfileListing />} />
                <Route path='employees' element={<EmployeeListing />} />
                <Route path='/' element={<Dashboard />} />
                <Route path='*' element={<NotFound />} />
              </Route>
            </Routes>
          </Content>
        </Layout>
      </Content>
    </Layout>
  )
}

export default Admin
