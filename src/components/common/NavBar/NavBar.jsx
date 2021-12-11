import React from 'react'
import styled from 'styled-components'
import Flex from '../../../UI/Flex'
import GetLogo from '../../../UI/GetLogo'
import Links from './PublicNavBar/Links'
import AuthBlock from './PublicNavBar/AuthBlock/AuthBlock'
import { useSelector } from 'react-redux'
import PublicNavBar from './PublicNavBar/PublicNavBar'
import PrivateNavBar from './PrivateNavBar/PrivateNavBar'

export default function NavBar() {
    const isAuth = useSelector(state => state.auth.isAuth)

    return (
        <SNavBar>
            <GetLogo />
            {
                isAuth ?
                    <PrivateNavBar /> 
                :
                    <PublicNavBar />
            }
        </SNavBar>
    )
}


const SNavBar = styled(Flex)`
    height: 80px;
    width: 100%;
    padding: 0px 50px;
    align-items:center;
    justify-content:space-between;
    box-shadow: 0 0 30px #e3e3e3;
`
