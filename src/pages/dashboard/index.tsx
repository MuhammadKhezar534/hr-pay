import React, { FC, useEffect, useState } from 'react'
import { Col, message, Row } from 'antd'
import { useNavigate } from 'react-router-dom'

import { Button, Stats, EmployeesTable } from '../../components'
import { Breifcase, Profile, User, Draft } from 'src/assets/icons'
import AddEmployee from './addEmployee'
import { handleError } from 'src/utilities/errorHandling'
import { getDashboardStats } from 'src/store'

const Dashboard: FC = () => {
  const [stats, setStats] = useState({
    draftProfiles: '',
    totalProfiles: '',
    completedProfiles: '',
    totalEmployees: '',
  })
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const fetchStats = () => {
    getDashboardStats()
      .then((res) => {
        setStats(res?.data?.data)
      })
      .catch((err) => {
        const erroMsg = handleError(err)
        message.error(erroMsg, 5)
      })
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return (
    <div>
      <Row className='mt-32' gutter={[16, 16]}>
        <Col xs={{ span: 9 }} md={{ span: 8 }} lg={{ span: 8 }} className={`d-grid align-items-center`}>
          <div>
            <h3>Overview</h3>
          </div>
        </Col>
        <Col
          xs={{ span: 15 }}
          md={{ span: 16 }}
          lg={{ span: 16 }}
          style={{
            textAlign: 'end',
          }}
        >
          <Row
            gutter={[16, 16]}
            style={{
              justifyContent: 'flex-end',
            }}
          >
            <Col>
              {open && (
                <AddEmployee
                  onSubmit={(id: string) => {
                    setOpen(false)
                    navigate('/profiles/' + id)
                  }}
                  open={open}
                  onCancel={() => setOpen(false)}
                />
              )}
            </Col>
            <Col>
              <Button label='Add Employee' onClick={() => setOpen(!open)} />
            </Col>
          </Row>
        </Col>
      </Row>
      <div className='mt-32'>
        <Row gutter={[24, 24]}>
          <Col xs={{ span: 24 }} md={{ span: 12 }} sm={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 6 }}>
            <div>
              <Stats label='Total Employees' icon={<Breifcase />} value={stats?.totalEmployees} background='#6A90FF' />
            </div>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} sm={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 6 }}>
            <div>
              <Stats label='Total Profiles' icon={<Profile />} value={stats?.totalProfiles} background='#6BDAD2' />
            </div>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} sm={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 6 }}>
            <div>
              <Stats label='Completed Profiles' icon={<User />} value={stats?.completedProfiles} background='#55C0FF' />
            </div>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} sm={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 6 }}>
            <div>
              <Stats label='Drafts' icon={<Draft />} value={stats.draftProfiles} background='#FA7777' />
            </div>
          </Col>
        </Row>
      </div>

      <Row className='my-32'>
        <Col
          xs={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 24 }}
          style={{
            textAlign: 'end',
          }}
        >
          <EmployeesTable fetchDashboardStats={fetchStats} isPaginatedData={false} />
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
