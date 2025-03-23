const GET_URL = () => {
  const { REACT_APP_ENV = 'https://poc.hr.com' } = process.env
  let url = ''
  switch (REACT_APP_ENV.trim()) {
    case 'dev':
      url = 'http://localhost:3008'

      break
    case 'qa':
      url = 'https://api-qa.poc.hr.net'
      break
    case 'staging':
      url = 'https://api-staging.poc.hr.net'
      break
    case 'production':
      url = 'https://poc.hr.net'
      break
    case 'local':
      url = 'http://localhost:3008'
      break
    default:
      break
  }

  return url
}

export const API_SERVER_URL = GET_URL()
