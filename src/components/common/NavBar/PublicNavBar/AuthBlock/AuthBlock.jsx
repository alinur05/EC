import Modal from 'antd/lib/modal/Modal'
import React, {useState} from 'react'
import styled, {css} from 'styled-components'
import { DARK_BLACK } from '../../../../../media/colors';
import Flex from '../../../../../UI/Flex';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';

export default function AuthBlock() {
    // SIGN UP

    const [signupModalVisible, setSignupModalVisible] = useState(false);
    const [signinModalVisible, setSigninModalVisible] = useState(false)

    return (
        <SAuthBlock>
            <SignInBtn onClick={() => setSigninModalVisible(true)}>Войти</SignInBtn>
                <SignInModal setSigninModalVisible={setSigninModalVisible} setSignupModalVisible={setSignupModalVisible} signinModalVisible={signinModalVisible}  />
            <SignUpBtn onClick={() => setSignupModalVisible(true)}>Регистрация</SignUpBtn>
                <SignUpModal setSigninModalVisible={setSigninModalVisible} signupModalVisible={signupModalVisible} setSignupModalVisible={setSignupModalVisible} />
        </SAuthBlock>
    )
}

const SAuthBlock = styled(Flex)`
    gap: 15px;
    align-items:center;
`
const SignInBtn = styled.button`
    border:none;
    color: #000;
    font-size: 20px;
    background: none;
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