import React, { useEffect } from 'react'
import styled from 'styled-components'
import ContentWrapper from '../../UI/ContentWrapper'
import Flex from '../../UI/Flex'
import Cabinet from '../common/PrivateComponents/Profile/Cabinet/Cabinet'
import ProfileBlock from '../common/PrivateComponents/Profile/ProfileBlock/ProfileBlock'
import { useDispatch } from 'react-redux'
import { getProfile } from '../../redux/actions/actions'
import { getLocalStorage } from '../../utiles'

export default function Profile() {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getProfile())
    }, [])
    
    return (
        <ContentWrapper>
            <h1>Профиль</h1>
            <Main>
                <ProfileBlock />
                <Cabinet />
            </Main>
        </ContentWrapper>
    )
}

const Main = styled(Flex)`
    width: 100%;
    gap: 50px;
`
