import React from 'react'
import styled from 'styled-components'
import Flex from '../../../../UI/Flex'
import GetLogo from '../../../../UI/GetLogo'
import ProfileBlock from './ProfileBlock/ProfileBlock'

export default function PrivateNavBar() {
    return (
        <SPrivateNavBar>
            <GetLogo />

            <ProfileBlock />
        </SPrivateNavBar>
    )
}

const SPrivateNavBar = styled(Flex)`
    width: 100%;
    justify-content:space-between;
`
