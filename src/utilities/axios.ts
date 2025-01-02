import Axios from 'axios'
import { API_SERVER_URL } from '../../src/server'

const getOptions = () => {
  const token = localStorage.getItem('XAUTH')
  return {
    headers: { Authorization: 'Bearer ' + token },
  }
}

const prepareUrl = (api: string) => API_SERVER_URL + api

const axios = {
  get: (api: string) => Axios.get(prepareUrl(api), getOptions()),
  post: (api: string, formData = {}) => Axios.post(prepareUrl(api), formData, getOptions()),
  patch: (api: string, formData = {}) => Axios.patch(prepareUrl(api), formData, getOptions()),
  put: (api: string, formData = {}) => Axios.put(prepareUrl(api), formData, getOptions()),
  delete: (api: string) => Axios.delete(prepareUrl(api), getOptions()),
}

export default axios
