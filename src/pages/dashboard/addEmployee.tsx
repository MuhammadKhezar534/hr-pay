import React, { FC, useEffect, useState } from 'react'
import { message } from 'antd'
import moment from 'moment'

import { getEmployee, saveEmployee } from './../../store'
import { isValidPhonenumber, validateEmail } from './../../utilities/validations'
import { handleError } from './../../utilities/errorHandling'
import { Button, Input, Select, Date, Phone, ImageUpload, Spinner, Modal } from '../../components/index'
import useDepartments from './../../hooks/useDepartments'
import useDesignations from './../../hooks/useDesignations'

export interface employee {
  name: string
  designation: string
  department: string
  dateOfBirth: string
  phone: string
  dateOfJoining: string
  email: string
  profilePicture: string
  _id?: string
}

interface props {
  onSubmit: (id: string) => void
  employeeId?: string
  open: boolean
  onCancel: () => void
}

export const AddEmployee: FC<props> = ({ onSubmit, open, onCancel, employeeId = '' }) => {
  const [employee, setEmployee] = useState<employee>({
    name: '',
    designation: '',
    department: '',
    dateOfBirth: '',
    phone: '',
    dateOfJoining: '',
    email: '',
    profilePicture: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    designation: '',
    department: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    dateOfJoining: '',
    profilePicture: '',
  })

  const [loading, setLoading] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)

  const [apiError, setApiError] = useState('')

  const { designations } = useDesignations()
  const { departments } = useDepartments()

  const handleChange = (value: string, name: string) => {
    setEmployee((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const filledValues = (id: string) => {
    getEmployee(id)
      .then((res) => {
        const { data } = res.data

        setEmployee({
          ...employee,
          _id: employeeId,
          name: data?.name,
          email: data?.email,
          phone: data?.phone,
          designation: data?.designation?._id,
          profilePicture: data?.profilePicture,
          department: data?.department?._id,
          dateOfBirth: moment(data?.dateOfBirth).format('YYYY-MM-DD'),
          dateOfJoining: moment(data?.dateOfJoining).format('YYYY-MM-DD'),
        })
        setUpdateLoading(false)
      })
      .catch((error) => {
        const errorMsg = handleError(error)
        message.error(errorMsg, 5)
      })
  }

  useEffect(() => {
    if (employeeId) {
      setUpdateLoading(true)
      filledValues(employeeId)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeId])

  const validateData = () => {
    const cloneErrors = {
      ...errors,
    }

    let canSubmit = true

    if (!employee.name) {
      cloneErrors.name = 'Name is mandatory'
      canSubmit = false
    }
    // else if (!isAlphabets(employee.name)) {
    //   cloneErrors.name = 'Name can only contains alphabets'
    //   canSubmit = false
    // }

    if (!validateEmail(employee.email)) {
      cloneErrors.email = 'Enter valid email'

      canSubmit = false
    }
    if (!employee.designation) {
      cloneErrors.designation = 'Select Designation'

      canSubmit = false
    }
    if (!employee.department) {
      cloneErrors.department = 'Select Department'
      canSubmit = false
    }
    if (!employee.dateOfBirth) {
      cloneErrors.dateOfBirth = 'Date of birth is mandatory'
      canSubmit = false
    }

    if (!isValidPhonenumber(employee.phone)) {
      cloneErrors.phone = 'Invalid phone number'
      canSubmit = false
    }
    if (!employee.dateOfJoining) {
      cloneErrors.dateOfJoining = 'Date of joining is mandatory'
      canSubmit = false
    }

    if (!employee.profilePicture) {
      cloneErrors.profilePicture = 'Profile Picture is mandatory'
      canSubmit = false
    }

    setErrors(cloneErrors)

    canSubmit && submitData()
  }

  const submitData = async () => {
    const isEdit = employeeId ? true : false
    setLoading(true)
    try {
      const { dateOfBirth, dateOfJoining } = employee

      const response = await saveEmployee(
        {
          ...employee,
          dateOfBirth: moment(dateOfBirth).format('YYYY-MM-DD'),
          dateOfJoining: moment(dateOfJoining).format('YYYY-MM-DD'),
        },
        isEdit,
      )
      message.success(isEdit ? 'Employee has been updated successfully' : 'Employee has been added successfully')
      onSubmit(response?.data.data._id)
    } catch (error) {
      const errorMsg = handleError(error)
      setApiError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  let showPopConfirm = false

  const { name, profilePicture, dateOfBirth, dateOfJoining, designation, department, email, phone } = employee

  if (name || profilePicture || dateOfBirth || dateOfJoining || phone || department || designation || email) {
    showPopConfirm = true
  }

  return (
    <Modal
      isOpen={open}
      width='496px'
      wrapClassName='employeeModal'
      title={`${employeeId ? 'Update' : 'Add'} Employee`}
      showPopConfirm={employeeId ? false : showPopConfirm}
      toggle={() => onCancel()}
    >
      {updateLoading ? (
        <Spinner fullPage={true} />
      ) : (
        <div>
          <div className='text-center pt-24'>
            <ImageUpload
              getUrl={(url: string) => {
                handleChange(url, 'profilePicture')
              }}
              url={profilePicture}
              error={errors.profilePicture}
            />
          </div>
          <div className='pt-24'>
            <Input
              name='name'
              value={name}
              label='Name'
              required={true}
              placeholder='Enter name'
              error={errors.name}
              type='text'
              onChange={handleChange}
            />
          </div>
          <div className='pt-16'>
            <Select
              label='Designation'
              onChange={(value: string) => handleChange(value, 'designation')}
              options={designations || []}
              error={errors.designation}
              required={true}
              placeHolder='Select Designation'
              value={designation}
            />
          </div>
          <div className='pt-16'>
            <Select
              label='Department'
              onChange={(value: string) => handleChange(value, 'department')}
              options={departments || []}
              error={errors.department}
              required={true}
              placeHolder='Select Department'
              value={department}
            />
          </div>
          <div className='pt-16'>
            <Date
              label='Date Of Birth'
              value={dateOfBirth}
              required={true}
              onChange={(date, dateString) => handleChange(dateString, 'dateOfBirth')}
              type={'date'}
              error={errors.dateOfBirth}
            />
          </div>
          <div className='pt-16'>
            <Input
              name='email'
              value={email}
              error={errors.email}
              maxLength={250}
              showCount={false}
              required={true}
              placeholder='Enter email'
              label='Email Address'
              type='text'
              onChange={handleChange}
            />
          </div>
          <div className='pt-16'>
            <Phone
              label='Phone Number'
              value={phone}
              required={true}
              error={errors.phone}
              onChange={(value: string) => handleChange(value, 'phone')}
            />
          </div>
          <div className='pt-16'>
            <Date
              label='Date Of Joining'
              error={errors.dateOfJoining}
              value={dateOfJoining}
              required={true}
              onChange={(date, dateString) => handleChange(dateString, 'dateOfJoining')}
              type={'date'}
            />
          </div>

          {apiError && <div className='error text-center py-16'>{apiError}</div>}
          <div className='pt-24 text-center'>
            <Button loading={loading} label={employeeId ? 'Update' : 'Add'} block={true} onClick={validateData} />
          </div>
        </div>
      )}
    </Modal>
  )
}

export default AddEmployee
