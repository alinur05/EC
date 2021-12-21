import React from 'react'
import styled from 'styled-components'
import { WHITE } from '../media/colors'
import Flex from './Flex'

export default function UnFound({text, color, size, height, width}) {
    return (
        <SUnFound color={color} size={size} height={height} >
            <Text color={color} size={size}>{text}</Text>
        </SUnFound>
    )
}

const SUnFound = styled(Flex)`
    width: ${({width}) => width || "100%"};
    height: ${({height}) => height || "100px"};
    justify-content:center;
    align-items:center;
`
const Text = styled.h3`
    margin: 0;
    font-size: ${({size}) => size || "26px"};
    color: ${({color}) => color || "#aeaeae"};
`