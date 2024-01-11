import axios, { AxiosError, HttpStatusCode } from 'axios'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

// khi ko import dc tuwf axios thì mình tạo 1 constans để tạo cho hàm HttpStatusCode từ constants -> httpStatusCode.enum.ts => và import từ file này vào
