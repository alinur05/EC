import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Flex from '../../../../../UI/Flex'
import defaultUserAva from '../../../../../media/defaultUserAva.png'

export default function ProfileBlock() {
    const userData = useSelector(state => state.session.userData)

    return (
        <SProfileBlock>
            <BalanceBlock>
                <Balance>Баланс:</Balance>
                <Bill>{userData.userBalance.userBalance} сом</Bill>
            </BalanceBlock>
            <ImgBlock>
                <Img 
                    src={userData.userImage ? userData.userImage : defaultUserAva}
                    alt="default userImage"
                />
            </ImgBlock>
        </SProfileBlock>
    )
}


const SProfileBlock = styled(Flex)`
    border-left: 1px solid #e3e3e3;
    padding: 8px;
    gap: 15px;
`
const ImgBlock = styled(Flex)`
    max-width: 65px;

`
const Img = styled.img`
    width:100%;
    border-radius: 100px;
    object-fit:cover;
`
const BalanceBlock = styled(Flex)`
    flex-direction:column;  
`
const Balance = styled.span`
    color: gray;
    font-size: 14px;
`
const Bill = styled.h3`
    margin: 0;
    font-size: 20px;
`