import { parsePhoneNumber } from 'awesome-phonenumber'

export const validateEmail = (email: string): boolean => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  )
}

export const isvalidUrlFormat = (url: string) => {
  const regex = new RegExp(
    '^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  )
  return regex.test(url)
}

export const isValidPhonenumber = (phone: string) => {
  const pn = parsePhoneNumber('+' + phone)
  return pn.valid
}

export const isAlphabets = (text: string) => {
  const regex = new RegExp('^[a-zA-Z]+(?: [a-zA-Z]+)*$')
  return regex.test(text)
}
