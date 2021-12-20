import React from 'react'
import styled from 'styled-components'
import Flex from './Flex'

export default function Error(text) {
    return (
        <SError>
            <Text>{text}</Text>
        </SError>
    )
}

const SError = styled(Flex)`
    width: 100%;
    height: 100px;
    justify-content:center;
    align-items:center;
`
const Text = styled.h3`
    margin: 0;
    font-size: 28px;
`