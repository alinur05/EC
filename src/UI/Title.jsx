import React from 'react'
import styled from 'styled-components'

export default function Title({children, size}) {
    return (
        <STitile size={size}>
            {children}
        </STitile>
    )
}

const STitile = styled.h1`
    display: block;
    margin: 0px 0px 20px 0px;
    font-size: ${({size}) => size || "36px"};
`