import React, {useState} from 'react'
import { useDispatch } from 'react-redux'

const useFetching = callback => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const fetch = async args => {
        try {
            setLoading(true)
            return await callback(args)
        }catch(e) {
            setError(e.message)
        }finally {
            setLoading(false)
        }
    }

    return [fetch, loading, error]
}

export default useFetching