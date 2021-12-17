import React from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import styled from 'styled-components'
import ContentWrapper from '../../UI/ContentWrapper'
import Flex from '../../UI/Flex'

export default function Category() {
    const {name} = useParams()

    return (
        <ContentWrapper>
            <h1>Category: {name} </h1>
        </ContentWrapper>
    )
}
