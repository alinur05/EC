import React from 'react'
import styled from 'styled-components'
import Flex from '../../../../UI/Flex'
import GetLogo from '../../../../UI/GetLogo'
import AuthBlock from './AuthBlock/AuthBlock'
import Links from './Links'

export default function PublicNavBar() {
    return (
        <SPublicNavBar>
            <Links />
            <AuthBlock />
        </SPublicNavBar>
    )
}

const SPublicNavBar = styled(Flex)`
    width: 60%;
    justify-content:space-between;
    height: 100%;

`