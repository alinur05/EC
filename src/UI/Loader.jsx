import { Spin } from 'antd'
import React from 'react'
import styled, { css } from 'styled-components'
import Flex from './Flex'

export default function Loader(type="medium") {
    return (
        <SLoader type>
            <Spin size={type} />
        </SLoader>
    )
}

const SLoader = styled(Flex)`
    width: 100%;
    height: 100px;
    align-items:center;
    justify-content:center;


    ${props => props.large && css`
        position: fixed;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    `} 
`