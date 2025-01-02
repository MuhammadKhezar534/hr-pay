import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import mockConsole from 'jest-mock-console' // Import mockConsole

import Login from './index'
import userEvent from '@testing-library/user-event'
// import { act } from 'react-dom/test-utils'
// import { loginUser } from './../../store'
import { server } from './../../mocks/server'
import { rest } from 'msw'

import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

// jest.mock('./../../store')

describe('Login', () => {
  const restoreConsole = mockConsole() // Call mockConsole to suppress warning messages
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    const btnElement = screen.getByRole('button')
    expect(btnElement).toBeInTheDocument()

    const inputElement = screen.getByText('Welcome back')
    expect(inputElement).toBeInTheDocument()

    restoreConsole()
    // expect(screen.getAllByTestId("[data-test='main-div']")).toBeInTheDocument()
  })

  it('displays error message when email is empty', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )
    const submitButton = screen.getByRole('button')
    userEvent.click(submitButton)

    expect(await screen.findByText('Email is invalid.')).toBeInTheDocument()
    restoreConsole()
  })

  it('displays error message when password is empty', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )
    const submitButton = screen.getByRole('button')
    userEvent.click(submitButton)

    expect(await screen.findByText('Password should be at least 6 charaters.')).toBeInTheDocument()
    restoreConsole()
  })

  it('displays error message when password or email is invalid', async () => {
    const { username, password } = { username: 'hr', password: 'password' }
    // const errorMessage = 'Invalid email or password!'

    // ;(loginUser as jest.Mock).mockResolvedValueOnce({ error: errorMessage })

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )
    const usernameInput = screen.getByLabelText(/Email/i)
    expect(usernameInput).toBeInTheDocument()

    const passwordInput = screen.getByLabelText(/Password/i)
    expect(passwordInput).toBeInTheDocument()

    const submitButton = screen.getByRole('button')

    userEvent.type(usernameInput, username)
    userEvent.type(passwordInput, password)
    userEvent.click(submitButton)

    await waitFor(() => {
      const errorMessage = screen.getByLabelText('api-error')
      expect(errorMessage).toBeInTheDocument()
    })
    // const errorMessage1 = screen.getByRole('alert')
    // expect(errorMessage1).toBeInTheDocument()
    // expect(await screen.findByText(errorMessage)).toBeInTheDocument()

    // await act(async () => {
    // await new Promise((resolve) => setTimeout(resolve, 500))
    //   const errorMessage = screen.getByLabelText('api-error')

    // const errorMessage = screen.getByRole('alert')
    // console.log({ errorMessage })
    // // expect(errorMessage.textContent).toBeInTheDocument()
    // expect('').toBeInTheDocument()

    // expect(await screen.findByText(errorMessage)).toBeInTheDocument()

    // })
    restoreConsole()
  })

  xit('when login successfully and token in storage', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    const { username, password } = { username: 'hr', password: 'password' }

    const usernameInput = screen.getByLabelText(/Email/i)
    expect(usernameInput).toBeInTheDocument()

    const passwordInput = screen.getByLabelText(/Password/i)
    expect(passwordInput).toBeInTheDocument()

    const submitButton = screen.getByRole('button')

    userEvent.type(usernameInput, username)
    userEvent.type(passwordInput, password)
    userEvent.click(submitButton)

    const token = localStorage.getItem('user')
    console.log({ token })
    expect(token).toMatch('user')
  })

  xit('renders error', async () => {
    server.use(
      rest.get('https://poc.hr.com/auth/login', (req, res, ctx) => {
        return res(ctx.status(502))
      }),
    )
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )
    // const error = await screen.findByRole('alert')
    // expect(error.textContent).toBeInTheDocument()

    const error = await screen.findByText('Error fetching users')
    expect(error).toBeInTheDocument()
  })

  xit('renders a list of users', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )
    const users = await screen.findAllByRole('listitem')
    expect(users).toHaveLength(3)
  })

  xit('renders a list of users', async () => {
    const mock = new MockAdapter(axios)
    // const data = [
    //   { id: 1, name: 'Item 1' },
    //   { id: 2, name: 'Item 2' },
    // ]
    const { username, password } = { username: 'hr', password: 'password' }

    mock.onPost('https://poc.hr.com/auth/login').reply(500)

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    const usernameInput = screen.getByLabelText(/Email/i)
    expect(usernameInput).toBeInTheDocument()

    const passwordInput = screen.getByLabelText(/Password/i)
    expect(passwordInput).toBeInTheDocument()

    const submitButton = screen.getByRole('button')

    userEvent.type(usernameInput, username)
    userEvent.type(passwordInput, password)
    userEvent.click(submitButton)

    // const users = await screen.findAllByRole('listitem')
    // expect(users).toHaveLength(3)

    await waitFor(() => {
      const text = screen.getByText('Error fetching users')
      expect(text).toBeInTheDocument()
    })
  })
})
