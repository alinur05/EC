import React from 'react'
import styled from 'styled-components'
import { RED } from '../media/colors'
import Flex from './Flex'

export default function Error({text, height, size, color}) {
    return (
        <SError height={height}>
            <Text size={size} color={color}>{text}</Text>
        </SError>
    )
}

const SError = styled(Flex)`
    width: 100%;
    height: ${({height}) => height || "100px"};
    justify-content:center;
    align-items:center;
`
const Text = styled.h3`
    margin: 0;
    font-size: ${({size}) => size || "28px"};
    color: ${({color}) => color || RED}
`