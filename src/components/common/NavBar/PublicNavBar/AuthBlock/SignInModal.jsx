import Modal from 'antd/lib/modal/Modal'
import React from 'react'
import { useState } from 'react'
import styled, {css} from 'styled-components'
import Flex from '../../../../../UI/Flex'
import googleIcon from '../../../../../media/googleIcon.svg'
import { DARK_BLACK } from '../../../../../media/colors'
import PostService from '../../../../../API/API'
import { auth, firebase } from '../../../../../firebase'
import { useDispatch } from 'react-redux'
import { authUser } from '../../../../../redux/actions/actions'
import { setLocalStorage } from '../../../../../utiles'
import useFetching from '../../../../../hooks/useFetching'
import useIsInputsFilled from '../../../../../hooks/useIsInputsFilled'

export default function SignInModal(props) {
    const {
        setSigninModalVisible,
        signinModalVisible,
        setSignupModalVisible
    } = props
    
    const dispatch = useDispatch()

    const [confirmLoading, setConfirmLoading] = useState(false)
    const [fields, setFields] = useState({username: "", password: ""})
    
    const [fetch, loading, error] = useFetching(async () => {
        dispatch(authUser(fields))
        setFields({username: "", password: ""})
        setSigninModalVisible(false)
    })

    const handleSignIn = async () => {
        fetch()
        console.log(loading)
        console.log(error)
    }

    const handleGoogleSignIn = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        const {user} = await auth.signInWithPopup(provider)

        const body = {
            password: user.uid,
            username: user.displayName.split(' ').join('')
        }
        
        dispatch(authUser(body))
    }
    
    const handleAlreadyHasAccount = () => {
        setSigninModalVisible(false)
        setSignupModalVisible(true)
    }

    return (
        <SModal
            title={false}
            visible={signinModalVisible}
            confirmLoading={confirmLoading}
            footer={false}
            header={false}
            onCancel={() => setSigninModalVisible(false)}
            bodyStyle={{width: "450px"}}
        >
            <ModalHeader>
                <ModalTitle>Войти</ModalTitle>
                    <GoogleIcon 
                        onClick={handleGoogleSignIn}
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
                    <Field type="text" placeholder="Логин" value={fields.username} onChange={e => setFields({...fields, username: e.target.value})} />
                    <Field type="password" placeholder="Пароль" value={fields.password} onChange={e => setFields({...fields, password: e.target.value})} />
            </ModalBody>
            <ModalFooter>
                <SignUpBtn style={{fontSize: "16px", padding: "9px 50px"}} onClick={handleSignIn}>Войти</SignUpBtn>
            </ModalFooter>
            <SigninPropmt onClick={handleAlreadyHasAccount}>Еще нет аккаунта? Регистрация</SigninPropmt>
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
const GoogleIcon = styled.img`
    width: 40px;
    margin: 15px 0px;
    cursor: pointer;
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
    padding: 20px 0px;
    flex-direction:column;   
    align-items:center;
    gap: 20px;
`
const Field = styled.input`
    width: 300px;
    padding: 10px 15px;
    outline: none;
    color: #676E8B;
    border-radius: 5px;
    font-size: 14px;
    border: 1px solid #DAE2F2;
`
const ModalFooter = styled(Flex)`
    width: 100%;
    padding: 20px 0x;
    justify-content:center;
    align-items:center;
`
const SigninPropmt = styled.span`
    position: absolute;
    bottom: -30px;
    color: #fff;
    left: 30%;
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
