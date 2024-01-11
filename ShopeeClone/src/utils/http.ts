import axios, { type AxiosInstance } from 'axios'

class Http {
  instanse: AxiosInstance
  constructor() {
    this.instanse = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

const http = new Http().instanse

export default http
