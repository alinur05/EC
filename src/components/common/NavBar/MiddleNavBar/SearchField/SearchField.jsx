import { SearchOutlined } from '@ant-design/icons'
import React from 'react'
import styled from 'styled-components'
import { DARK_BLACK } from '../../../../../media/colors'
import Flex from '../../../../../UI/Flex'

export default function SearchField() {
    return (
        <SSearchField>
            <SearchIcon />
            <Searcher placeholder="Ищите что угодно.." />
        </SSearchField>
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