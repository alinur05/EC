import { EditOutlined } from '@ant-design/icons/lib/icons'
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { DARK_BLACK } from '../../../../../media/colors'
import Flex from '../../../../../UI/Flex'

export default function ContentBlock() {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.session.userData)
    const [fields, setFields] = useState({
        fullName: userData.userModelToSend.fullName || "",
        email: userData.userModelToSend.email || "",
        birthDay: userData.userModelToSend.birthDay || "",
        file: null
    })

    const handleFieldChainging = e => setFields({...fields, [e.target.name]:e.target.value})

    return (
        <SContentBlock>
            <UserName>@{userData.userModelToSend && userData.userModelToSend.username}</UserName>
            <List>
                <Clause>
                    <span>Имя: </span>
                    <Field 
                        type="text"
                        placeholder="Имя"
                        name="fullName"
                        value={fields.fullName}
                        onChange={handleFieldChainging}
                        disabled
                    />
                    <EditOutlined style={{cursor: "pointer"}} />
                </Clause>
                <Clause>
                    <span>Email: </span>
                    <Field 
                        type="email"
                        placeholder="email"
                        name="email"
                        value={fields.email}
                        onChange={handleFieldChainging}
                        disabled
                    />
                    <EditOutlined style={{cursor: "pointer"}}/>
                </Clause>
                <Clause>
                    <span>Баланс: {userData.userBalanceModel && userData.userBalanceModel.userBalance}</span>
                    <CashBtn>Пополнить +</CashBtn>
                </Clause>
            </List>
        </SContentBlock>
    )
}

const CashBtn = styled.button`
    font-size: 12px;
    border: 1px solid #e3e3e3;
    padding: 1px 13px;
    color: #252525;
    background: none;
    font-size: 14px;
    border-radius:5px;
    cursor:pointer;
    &:hover {
        border: 1px solid ${DARK_BLACK};
        color: #000;
    }
`
const SaveBtn = styled.button`
    font-size: 16px;
    border: 1px solid #EFECEA;
    border-radius: 5px;
    margin-top: 30px;
    align-self:flex-end;
    padding: 5px 8px;
`
const Field = styled.input`
    outline: none;
    border:none;
    max-width: 150px;
    min-width: 150px;
`
const Clause = styled.li`
    font-size: 16px;
    color: gray;
    list-style-type: none;
    display:flex;
    gap: 5px;
`
const List = styled.ul`
    padding: 0; 
    margin: 0;
    display:flex;
    flex-direction:column;
    gap: 5px;
`
const UserName = styled.h3`
    color: gray;
    font-size: 28px;
    margin: 0;
`
const SContentBlock = styled(Flex)`
    width: 100%;
    flex-direction:column;
    padding-left: 20px;
`