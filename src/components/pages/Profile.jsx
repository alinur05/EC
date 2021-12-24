import React, { useEffect } from 'react'
import styled from 'styled-components'
import ContentWrapper from '../../UI/ContentWrapper'
import Flex from '../../UI/Flex'
import Cabinet from '../common/PrivateComponents/Profile/Cabinet/Cabinet'
import ProfileBlock from '../common/PrivateComponents/Profile/ProfileBlock/ProfileBlock'
import { useDispatch } from 'react-redux'
import { cleanUpProfile, getProfile } from '../../redux/actions/actions'
import { getLocalStorage } from '../../utiles'
import Title from '../../UI/Title'

export default function Profile() {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getProfile())
    }, [])
    
    return (
        <ContentWrapper>
            <Title>Профиль</Title>
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
