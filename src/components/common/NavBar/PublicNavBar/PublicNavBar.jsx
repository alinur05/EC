import React from 'react'
import styled from 'styled-components'
import Flex from '../../../../UI/Flex'
import GetLogo from '../../../../UI/GetLogo'
import AuthBlock from './AuthBlock/AuthBlock'

export default function PublicNavBar() {
    return (
        <SPublicNavBar>
            <AuthBlock />
        </SPublicNavBar>
    )
}

const SPublicNavBar = styled(Flex)`
    justify-content:space-between;
    height: 100%;
`