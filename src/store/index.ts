import NpmAxios from 'axios'
import { employee } from 'src/pages/dashboard/addEmployee'
import { API_SERVER_URL } from '../../src/server'
import axios from './../utilities/axios'

export const loginUser = (email: string, password: string) => {
  const url = '/auth/login'
  return axios.post(url, { email, password })
}

export const getDashboardStats = () => {
  return axios.get(`/employee/dashboard`)
}

export const getEmployeesData = ({
  limit,
  page,
  id,
  searchText,
}: {
  limit: number
  page: number
  id: string
  searchText: string
}) => {
  const url = `/employee?limit=${limit}&page=${page}&id=${id}&empSearch=${searchText}`
  return axios.get(url)
}

export const deleteEmployee = (employeeId: string) => {
  const url = `/employee/${employeeId}`
  return axios.delete(url)
}

export const createProfile = (employeeId: string, profileName: string) => {
  const url = '/profile'
  return axios.post(url, {
    employeeId,
    profileName,
  })
}

export const cloneProfile = (profileId: string, profileName: string) => {
  const url = '/profile/cloneProfile'
  return axios.post(url, {
    profileId,
    profileName,
  })
}

export const getBuffer = async (options: any, id: string) => {
  const checkOptions = {
    profileId: id,
    ...options,
  }

  const token = localStorage.getItem('XAUTH')

  const requestObject: any = {
    responseType: 'arraybuffer',
    headers: { Authorization: 'Bearer ' + token },
  }

  const apiUrl = API_SERVER_URL + '/export'
  const response = await NpmAxios.post(apiUrl, checkOptions, requestObject)

  return response
}

export const getDesignations = () => {
  const url = '/designations'
  return axios.get(url)
}

export const getDepartments = () => {
  const url = '/departments'
  return axios.get(url)
}

export const saveProfileData = (id: string, data: object) => {
  const url = '/profile/' + id
  return axios.put(url, data)
}

export const getProfile = (id: string) => {
  const url = '/profile/' + id
  return axios.get(url)
}

export const deleteProfile = (id: string) => {
  const url = '/profile/' + id
  return axios.delete(url)
}

export const saveEmployee = (requestBody: employee, isEdit = false) => {
  const url = '/employee'
  if (!isEdit) {
    return axios.post(url, requestBody)
  } else return axios.put(url, requestBody)
}

export const getImageUrl = (profilePicture: FormData) => {
  const url = '/employee/uploadImage'

  return axios.post(url, profilePicture)
}

export const getEmployeeProfiles = (id: string) => {
  const url = '/profile/employeeProfiles?employeeId=' + id
  return axios.get(url)
}

export const getEmployee = (id: string) => {
  const url = '/employee/' + id
  return axios.get(url)
}
