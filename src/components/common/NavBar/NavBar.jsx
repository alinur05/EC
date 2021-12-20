import React from 'react'
import styled from 'styled-components'
import Flex from '../../../UI/Flex'
import GetLogo from '../../../UI/GetLogo'
import AuthBlock from './PublicNavBar/AuthBlock/AuthBlock'
import { useSelector } from 'react-redux'
import PublicNavBar from './PublicNavBar/PublicNavBar'
import PrivateNavBar from './PrivateNavBar/PrivateNavBar'
import { DARK_BLACK, WHITE } from '../../../media/colors'
import {SearchOutlined} from '@ant-design/icons'
import MiddleNavBar from './MiddleNavBar/MiddleNavBar'

export default function NavBar() {
    const isAuth = useSelector(state => state.session.isAuth)

    return (
        <SNavBar>
            <Left>
                <GetLogo />
                <MiddleNavBar />
            </Left>
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
const Left = styled(Flex)`
    gap: 20px;
    align-items:center;
`
