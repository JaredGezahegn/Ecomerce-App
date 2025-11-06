import { useCallback, useEffect, useState } from 'react'
import { api } from '../utils/api'

export default function useFetch(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.get(url, options)
      setData(res.data)
    } catch (err) {
      setError(err?.response?.data?.detail || err.message || 'Failed to fetch')
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}


