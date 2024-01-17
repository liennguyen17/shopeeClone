import axios, { HttpStatusCode, AxiosError, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { AuthResponse } from 'src/types/auth.type'
import { clearLs, getAccessTokenFromLS, setAccessTokenToLS, setProfileToLS } from './auth'
import { config } from 'process'
import { error } from 'console'
import path from 'src/constants/path'

class Http {
  instanse: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instanse = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instanse.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instanse.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === path.login || url === path.register) {
          const data = response.data as AuthResponse
          this.accessToken = (response.data as AuthResponse).data.access_token
          setAccessTokenToLS(this.accessToken)
          setProfileToLS(data.data.user)
        } else if (url === path.logout) {
          this.accessToken = ''
          clearLs()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instanse

export default http
