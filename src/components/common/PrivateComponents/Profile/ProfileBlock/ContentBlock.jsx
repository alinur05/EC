import { EditOutlined,CloseOutlined} from '@ant-design/icons/lib/icons'
import React, {useMemo, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { editProfile } from '../../../../../redux/actions/actions'
import Flex from '../../../../../UI/Flex'
import {getLocalStorage} from '../../../../../utiles'

export default function ContentBlock() {
    const dispatch = useDispatch()
    let inputFocusName = useRef()
    let inputFocusEmail = useRef()

    const userData = useSelector(state => state.session.userData)

    const storage = getLocalStorage('session').userModelToSend

    let [isDisabled,setIsDisabled] = useState({
        name: true,
        email: true
    })

    const [fields, setFields] = useState({
        id: storage.id,
        password: null,
        fullName: storage.fullName || "",
        email: storage.email || "",
        birthDay:  "",
    })


    const handleFieldChanging = e => setFields({...fields, [e.target.name]:e.target.value})


    // const isChanged = useMemo(() => {
    //     let result = false
    //
    //         for(let i in fields) {
    //             if(fields[i] !== userData.userModelToSend[i] && i !== "file") {
    //                 result = true
    //             }
    //         }
    //
    //     return result
    // }, [fields])


   const toggler = (prop)=>{
        return () => {
            setIsDisabled({...isDisabled,...prop })
            const timer = setTimeout(()=>{
                inputFocusName.current.focus()
                inputFocusEmail.current.focus()
            },100)
        }
   }


    const handleSave = async () => {
        dispatch(editProfile(fields))
    }

    return (
        <SContentBlock>
            <UserName>@{storage && storage.username}</UserName>
            <List>
                <Clause>
                    <span>Имя: </span>
                    <Field
                        onDoubleClick={(e)=>console.log()}
                        ref={inputFocusName}
                        type="input"
                        placeholder="Имя"
                        name="fullName"
                        onBlur={toggler({name:true})}
                        value={fields.fullName}
                        onChange={handleFieldChanging}
                        disabled={isDisabled.name}
                    />
                    { isDisabled.name ? <EditOutlined onClick={toggler({name: false})} style={{cursor: "pointer"}}/> : <CloseOutlined onClick={toggler({name: true})}/>}
                </Clause>
                <Clause>
                    <span>Email: </span>
                    <Field
                        ref={inputFocusEmail}
                        type="email"
                        placeholder="email"
                        name="email"
                        onBlur={toggler({email:true})}
                        value={fields.email}
                        onChange={handleFieldChanging}
                        disabled={isDisabled.email}
                    />
                    { isDisabled.email ? <EditOutlined onClick={toggler({email: false})} style={{cursor: "pointer"}}/> : <CloseOutlined onClick={toggler({email: true})}/>}
                </Clause>
                <Clause>
                    <span>Баланс: {userData.userBalanceModel && userData.userBalanceModel.userBalance}</span>
                </Clause>
            </List>
            <input 
                type="file"
                id="ava"
                style={{display:"none"}}
                onChange={e => setFields({...fields, file: e.target.files[0]})}
            />
            <SaveBtn onClick={handleSave}><label style={{cursor:'pointer'}}>Сохранить</label></SaveBtn>
        </SContentBlock>
    )
}

const SaveBtn = styled.button`
    font-size: 16px;
    border: 1px solid #EFECEA;
    border-radius: 5px;
    margin-top: 30px;
    align-self:flex-end;
    padding: 5px 8px;
    cursor:pointer;
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