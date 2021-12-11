import React from 'react'
import styled from 'styled-components'
import Flex from './Flex'
import Logo from '../media/Logo.svg'

export default function GetLogo(props) {
    return (
        <LogoWrapper {...props}>
            <Img 
                src={Logo}
                alt="logo"
            />
            
        </LogoWrapper>
    )
}

const LogoWrapper = styled(Flex)`
    width: ${({width}) => width || "140px"};
`
const Img = styled.img`
    width: 100%;
`