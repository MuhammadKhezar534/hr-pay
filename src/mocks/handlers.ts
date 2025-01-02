import { rest } from 'msw'

// export const handlers = [
//   rest.post('https://poc.hr.com//auth/login', (req, res, ctx) => {
//     console.log('in mock')
//     localStorage.setItem('user', 'user')
//     localStorage.setItem('XAUTH', 'token')
//     return res(ctx.status(200))
//   }),
// ]
export const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          name: 'Bruce Wayne',
        },
        {
          name: 'Clark Kent',
        },
        {
          name: 'Princess Diana',
        },
      ]),
    )
  }),
]
