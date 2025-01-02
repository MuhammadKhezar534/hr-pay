import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import { validateEmail } from './../../utilities/validations'
import { Button, Input } from '../../components/index'
import { handleError } from './../../utilities/errorHandling'
import { loginUser } from './../../store'

import style from './style.module.scss'

const Login = () => {
  const navigate = useNavigate()
  const loggedIn = localStorage.getItem('XAUTH')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const [apiError, setApiError] = useState('')

  const [error, setError] = useState({
    email: '',
    password: '',
  })

  const checkValidation = () => {
    const localError = {
      email: '',
      password: '',
    }
    setApiError('')

    if (!validateEmail(email)) {
      if (!email) {
        localError.email = 'Please enter the email'
      } else {
        localError.email = 'Email is invalid'
      }
      setLoading(false)
    } else {
      localError.email = ''
    }
    if (password.length < 6) {
      if (!password) {
        localError.password = 'Please enter the password'
      } else {
        localError.password = 'Please enter correct password'
      }
      setLoading(false)
    } else {
      localError.password = ''
    }
    setError({
      ...localError,
    })
    const validate = localError.email + localError.password
    if (validate.length <= 0) {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    setLoading(true)
    loginUser(email, password)
      .then((res) => {
        const { access_token } = res.data.data
        const user: string = jwt_decode(res?.data?.data?.access_token)
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('XAUTH', access_token)
        navigate('/', { replace: true })
      })
      .catch((err) => {
        setLoading(false)
        const errorMsg = handleError(err)
        setApiError(errorMsg)
      })
  }

  const login = () => {
    setLoading(true)
    checkValidation()
  }

  if (loggedIn) {
    return <Navigate to={'/'} />
  }
  return (
    <div className={style.wrapper}>
      <div className={style.loginContainer}>
        <div className='text-center'>
          <img src='assets/RPB_logo.svg' className={style.logo} alt='logo'></img>
          <div className={style.heading}>Welcome back</div>
          <div className={style.text}>Log in to continue.</div>
        </div>
        <Input
          name='email'
          label='Email'
          placeholder='name@gmail.com'
          value={email}
          showCount={false}
          onPressEnter={login}
          error={error.email}
          onChange={(value: string) => {
            setEmail(value)
          }}
          type='text'
        />

        <div className={style.pt20}>
          <Input
            name='password'
            label='Password'
            placeholder='Enter password'
            value={password}
            showCount={false}
            onPressEnter={login}
            error={error.password}
            onChange={(value: string) => {
              setPassword(value)
            }}
            type='password'
          />
        </div>

        <div className={`${style.error} text-center`} aria-label='api-error' role='alert'>
          {apiError}
        </div>

        <Button label='Login' block={true} loading={loading} onClick={login} />
      </div>
    </div>
  )
}

export default Login
