import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { DARK_BLACK } from '../media/colors'
import Flex from './Flex'
import whiteLogo from '../media/whiteLogo.svg'
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../redux/actions/actions'
import { useHistory } from 'react-router-dom'

export default function GetFooter() {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.session.isAuth)
    const history = useHistory()

    const handleLogout = () => {
        dispatch(logoutUser())
    }

    return (
        <SFooter>
            <Img src={whiteLogo} alt="white logo" onClick={() => history.push("/main")} />
            <Flex align="center">
                <List>
                    <Clause to="/main">
                        Главная
                    </Clause>
                    <Clause to="/about">
                        О нас
                    </Clause>
                </List>
            </Flex>
            {
                isAuth &&
                    <LogOut onClick={handleLogout}>
                        Выйти
                        <LogoutOutlined />
                    </LogOut>
            }

        </SFooter>
    )
}

const SFooter = styled(Flex)`
    width: 100%;
    height: 100px;
    align-items:center;
    padding: 0px 50px;
    justify-content:space-between;
    background: ${DARK_BLACK}
`
const Img = styled.img`
    width: 200px;
    cursor:pointer;
`
const List = styled.ul`
    display:flex;
    margin: 0;
    padding: 0;
    gap: 15px;
`
const Clause = styled(NavLink)`
    color: #fff;
    font-size: 18px;

    &:hover {
        color: #fff;
        text-decoration:underline;
    }
`
const LogOut = styled.button`
    display:flex;
    outline: none;
    border: none;
    background: none;
    font-size: 18px;
    color: #fff;
    cursor:pointer;
    align-items:center;
    gap: 10px;
    &:hover {
        text-decoration:underline;
    }
`
const SignIn = styled(LogOut)`

`