import React from 'react'
import styled from 'styled-components'

export default function Title({children, props}) {
    return (
        <STitile {...props}>
            {children}
        </STitile>
    )
}

const STitile = styled.h1`
    display: block;
    margin: 0px 0px 30px 0px;
    font-size: 36px;
`