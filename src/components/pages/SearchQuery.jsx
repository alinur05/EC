import React from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

export default function SearchQuery() {
    const {query} = useParams()

    return (
        <div>
            <h1>Results on query {query}</h1>
        </div>
    )
}
