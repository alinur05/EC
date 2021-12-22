import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import React from 'react'
import styled, { css } from 'styled-components'
import { DARK_BLACK } from '../media/colors'
import Flex from './Flex'

export default function Loader({width, height, size, children}) {
    return (
        <LoadinerWrapper width={width} height={height}>
            <SLoader size={size} spin>
                {children}
            </SLoader>
        </LoadinerWrapper>
    )
}

const LoadinerWrapper = styled(Flex)`
    width: ${({width}) => width || "100%"};
    height: ${({height}) => height || "100px"};
    justify-content:center;
    align-items:center;
`
const SLoader = styled(LoadingOutlined)`
    font-size: ${({size}) => size || "32px"};
    color: ${DARK_BLACK}
`