import { useState, useEffect } from 'react'
import { getDesignations } from './../store'
import { handleError } from './../utilities/errorHandling'

interface designations {
  value: string
  label: string
}

const useDesignations = () => {
  const [designations, setDesignations] = useState<designations[]>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cacheDesignations = localStorage.getItem('designations')

        if (cacheDesignations) {
          parseData(JSON.parse(cacheDesignations))
          return
        } else {
          const response = await getDesignations()
          const { designations } = response.data.data
          localStorage.setItem('designations', JSON.stringify(designations))
          parseData(designations)
          setLoading(false)
        }
      } catch (error) {
        const errorMsg = handleError(error)
        setError(errorMsg)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const parseData = (designations: any) => {
    const formattedDesignations = designations.map((designation: { title: string; _id: string }) => {
      const { title, _id } = designation
      return {
        label: title,
        value: _id,
      }
    })

    setDesignations(formattedDesignations)
  }

  return { designations, loading, error }
}

export default useDesignations
