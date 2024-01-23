//hook lấy được những query param trên url
import { useSearchParams } from 'react-router-dom'

export default function useQueryParam() {
  const [searchParams] = useSearchParams()
  return Object.fromEntries([...searchParams])
}
