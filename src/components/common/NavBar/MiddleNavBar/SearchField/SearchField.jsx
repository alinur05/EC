import { SearchOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import styled from 'styled-components'
import { DARK_BLACK } from '../../../../../media/colors'
import ContentWrapper from '../../../../../UI/ContentWrapper'
import Flex from '../../../../../UI/Flex'

export default function SearchField() {
    const [query, setQuery] = useState('')
    const hsitory = useHistory()

    const onSubmit = e => {
        e.preventDefault()
        hsitory.push(`/search/${query}`)
    }

    return (
        <form onSubmit={onSubmit} >
            <SSearchField>
                <SearchIcon />
                <Searcher value={query} onChange={e => setQuery(e.target.value)} placeholder="Ищите что угодно.." />
            </SSearchField>
        </form>
    )
}


const SSearchField = styled(Flex)`
    width: 350px;
    border: 1px solid ${DARK_BLACK};
    padding: 6px 12px;
    align-items:center;
    border-radius: 5px;
    gap: 15px;
`
const Searcher = styled.input`
    width: 100%;
    outline: none;
    border: none;
    font-size: 18px;
    color: ${DARK_BLACK}
`
const SearchIcon = styled(SearchOutlined)`
    font-size: 18px;
    color: ${DARK_BLACK};
`