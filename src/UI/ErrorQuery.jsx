import React from 'react'
import styled from 'styled-components'
import { RED } from '../media/colors'
import Flex from './Flex'

export default function ErrorQuery({error}) {
    return (
        <SErrorQuery>
            <Error>{error}</Error>
        </SErrorQuery>
    )
}

const SErrorQuery = styled(Flex)`
    width: 100%;
    min-height: 25px;
    justify-content:center;
    align-items:center;
`
const Error = styled.p`
    color: ${RED};
    font-size: 14px; 
    margin: 0;
`