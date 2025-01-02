import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import { API_SERVER_URL } from '../server'

export const employeeColumns = (LF: any) => {
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: any, record: any) => {
        return (
          <Link to={'/profiles/' + record._id}>
            <div className='d-flex align-items-center'>
              <img className='table-image' src={API_SERVER_URL + '/' + record.profilePicture} />
              <strong>{text}</strong>
            </div>
          </Link>
        )
      },
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Joining Date',
      dataIndex: 'dateOfJoining',
      key: 'dateOfJoining',
      render: (prop: any) => moment(prop).format('DD-MM-YY'),
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      render: (data: any) => LF(data),
    },
  ]
}
