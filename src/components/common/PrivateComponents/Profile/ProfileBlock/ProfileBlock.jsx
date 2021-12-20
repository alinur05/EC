import React from 'react'
import styled from 'styled-components'
import Flex from '../../../../../UI/Flex'
import defaultUserAva from '../../../../../media/defaultUserAva.png'
import { useSelector } from 'react-redux'
import ContentBlock from './ContentBlock'

export default function ProfileBlock() {
    const userData = useSelector(state => state.session.userData)

    return (
        <SProfileBlock>
            <AvaBlock>
                <AvaWrapperBlock>
                    <Ava 
                        src={userData.userImageModel ? userData.userImageModel : defaultUserAva}
                    />
                </AvaWrapperBlock>
                <ChangeAvaBtn>
                    Изменить аватар
                </ChangeAvaBtn>
            </AvaBlock>
            <ContentBlock />
        </SProfileBlock>
    )
}


const ChangeAvaBtn = styled.button`
    width: 150px;
    text-align:center;
    padding: 5px 0px;
    border: 1px solid #EFECEA;
    border-radius: 5px;
    background: #fff;
    font-size: 16px;
    cursor:pointer;

    &:hover {
        opacity: 0.6;
    }
`
const Ava = styled.img`
    width: 100%;
    height: 100%;
    object-fit:cover;
    border-radius: 100px;
`
const AvaWrapperBlock = styled.div`
    width: 150px;
    gap: 15px;
`
const AvaBlock = styled(Flex)`
    flex-direction:column;
    gap: 15px;
    align-items;center;
`
const SProfileBlock = styled(Flex)`

`