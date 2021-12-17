import React from 'react'
import styled from 'styled-components'
import Flex from './Flex'
import Logo from '../media/Logo.svg'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export default function GetLogo(props) {
    const history = useHistory()

    return (
        <LogoWrapper {...props} onClick={() => history.push("/main")}>
            <Img 
                src={Logo}
                alt="logo"
            />
            
        </LogoWrapper>
    )
}

const LogoWrapper = styled(Flex)`
    width: ${({width}) => width || "140px"};
    cursor:pointer;
`
const Img = styled.img`
    width: 100%;
`