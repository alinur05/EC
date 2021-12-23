import Modal from 'antd/lib/modal/Modal'
import React, { useState } from 'react'
import styled, {css} from 'styled-components'
import Flex from '../../../../../UI/Flex'
import googleIcon from '../../../../../media/googleIcon.svg'
import { DARK_BLACK } from '../../../../../media/colors'
import { getLocalStorage, signupFieldsValidator } from '../../../../../utiles'
import PostService from '../../../../../API/API'
import { auth, firebase } from '../../../../../firebase'
import {signUpUser, setAuthError, clearAuthErrors} from '../../../../../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'
import ErrorQuery from '../../../../../UI/ErrorQuery'
import useFetching from '../../../../../hooks/useFetching'
import Loader from '../../../../../UI/Loader'

export default function SignUpModal(props) {
    
    const { 
        setSigninModalVisible,
        setSignupModalVisible,
        signupModalVisible,
    } = props

    const dispatch = useDispatch()
    const {signup} = useSelector(state => state.session.error)
    const loading = useSelector(state => state.session.loading)

    const [fields, setFields] = useState({
        fullName: "",
        username: "",
        password: "",
        email: "",
        repeat_password: ""
    })

    const handleGoogleSignUp = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        const {user} = await auth.signInWithPopup(provider)

        const body = {
            fullName: user.displayName,
            email: user.email,
            password: user.uid,
            username: user.displayName.split(' ').join('')
        }
        
        dispatch(signUpUser(body))
        const session = getLocalStorage("session")
        if(session) {
            handleModalCancel()
        }
    }

    const handleSignUp = async () => {
        const responce = signupFieldsValidator(fields)

        if(responce.isValid) {
            let body = {...fields}
            delete body.repeat_password

            dispatch(signUpUser(body))

            const session = getLocalStorage("session")
            if(session) {
                handleModalCancel()
            }
        }else {
            dispatch(setAuthError("signup", responce.error))
        }
    }
   
    const handleAlreadyHasAccount = () => {
        setSignupModalVisible(false)
        setSigninModalVisible(true)
    }

    const handleModalCancel = () => {
        setSignupModalVisible(false)
        dispatch(clearAuthErrors())
        setFields({fullName: "",username: "",password: "",repeat_password: "", email: ""})
    }
    
    return (
        <SModal
                title={false}
                visible={signupModalVisible}
                confirmLoading={loading}
                footer={false}
                header={false}
                onCancel={handleModalCancel}
                bodyStyle={{width: "450px", marginBottom: "100px"}}
            >
                <ModalHeader>
                    <ModalTitle>Регистрация</ModalTitle>
                    <PreTitlle>регистрация в один клик</PreTitlle>
                    <GoogleIcon 
                        onClick={handleGoogleSignUp}
                        src={googleIcon}
                        alt="googe icon"
                    />
                    <OrBlock>
                        <OrItem line></OrItem>
                        <OrItem>или</OrItem>
                        <OrItem line></OrItem>
                    </OrBlock>
                </ModalHeader>
                <ModalBody>
                    <Field type="text" placeholder="email" value={fields.email} onChange={e => setFields({...fields, email: e.target.value})} />
                    <Flex gap="10px" width="100%" justify="center">
                        <Field width="145px" type="text" placeholder="Полное имя" value={fields.fullName} onChange={e => setFields({...fields, fullName: e.target.value})} />
                        <Field width="145px" type="text" placeholder="Логин" value={fields.username} onChange={e => setFields({...fields, username: e.target.value})} />
                    </Flex>
                    <Flex gap="10px" width="100%" justify="center">
                        <Field width="145px" type="password" placeholder="Пароль" value={fields.password} onChange={e => setFields({...fields, password: e.target.value})} />
                        <Field width="145px" type="password" placeholder="Повторите пароль еще раз" value={fields.repeat_password} onChange={e => setFields({...fields, repeat_password: e.target.value})} />
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    {
                        loading ?
                            <Loader height="auto" />
                        :
                            <SignUpBtn style={{fontSize: "16px", padding: "9px 50px"}} onClick={handleSignUp}>Регистрация</SignUpBtn>
                    }
                    <ErrorQuery error={signup}/>
                </ModalFooter>
                <SigninPropmt onClick={handleAlreadyHasAccount}>Уже есть аккаунт? Войти</SigninPropmt>
            </SModal>
    )
}


const SModal = styled(Modal)`
    width: 450px;   
    padding: 0px 35px;
    position: relative;
`
const ModalHeader = styled(Flex)`
    width: 100%;
    flex-direction:column;
    align-items:center;
`
const ModalTitle = styled.h2`
    font-size: 32px;
    color: #000;
    margin: 0;
`
const PreTitlle = styled.span`
    font-size: 14px;
    color: #969696;
`
const GoogleIcon = styled.img`
    width: 40px;
    margin: 15px 0px;
    cursor:pointer;
`
const OrBlock = styled(Flex)`
    align-items:center;
    gap: 15px;
`
const OrItem = styled.span`
    color: #C1C1C1;
    display: inline;
    font-size: 14px;
    ${props => props.line && css `
        width: 150px;
        background: #C1C1C1;
        height: 1px;
    `}
`
const ModalBody = styled(Flex)`
    width: 100%;
    height: 100%;
    padding: 20px 0px;
    flex-direction:column;   
    align-items:center;
    gap: 20px;
`
const Field = styled.input`
    width: ${({width}) => width || "300px"};
    padding: 10px 15px;
    outline: none;
    color: #676E8B;
    border-radius: 5px;
    font-size: 14px;
    border: 1px solid #DAE2F2;
`
const ModalFooter = styled(Flex)`
    width: 100%;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    gap: 15px;
`
const SigninPropmt = styled.span`
    position: absolute;
    bottom: -30px;
    color: #fff;
    left: 35%;
    font-size: 14px;
    cursor:pointer;
`
const SignUpBtn = styled.button`
    background: ${DARK_BLACK};
    padding: 5px 13px;
    border-radius: 5px;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    border: 1px solid ${DARK_BLACK};
`
