import React from 'react'
import { useParams } from 'react-router-dom'

export default function SearchCategory() {
    const {categoryId} = useParams()

    return (
        <div>
            <h1>{categoryId}</h1>
        </div>
    )
}
