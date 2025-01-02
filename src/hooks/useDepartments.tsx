import { useState, useEffect } from 'react'
import { getDepartments } from './../store'
import { handleError } from './../utilities/errorHandling'

interface department {
  value: string
  label: string
}

const useDepartments = () => {
  const [departments, setDepartments] = useState<department[]>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cacheDepartments = localStorage.getItem('departments')

        if (cacheDepartments) {
          parseData(JSON.parse(cacheDepartments))
          return
        } else {
          const response = await getDepartments()
          const { departments } = response.data
          localStorage.setItem('departments', JSON.stringify(departments))
          parseData(departments)
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

  const parseData = (departments: any) => {
    const formattedDepartments = departments.map((designation: { title: string; _id: string }) => {
      const { title, _id } = designation
      return {
        label: title,
        value: _id,
      }
    })

    setDepartments(formattedDepartments)
  }

  return { departments, loading, error }
}

export default useDepartments
