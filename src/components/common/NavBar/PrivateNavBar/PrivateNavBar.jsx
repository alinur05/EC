import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Flex from '../../../../UI/Flex'
import GetLogo from '../../../../UI/GetLogo'
import ProfileBlock from './ProfileBlock/ProfileBlock'
import defaultUserAva from '../../../../media/defaultUserAva.png'
import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Dropdown, Menu } from 'antd';
import { useHistory } from 'react-router-dom'
import { logoutUser } from '../../../../redux/actions/actions'

export default function PrivateNavBar() {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.session.userData)
    const history = useHistory()

    const handleLogout = () => {
        dispatch(logoutUser())
    }

    const menu = (
        <Menu>
            <MenuItem icon={<UserOutlined style={{fontSize: "20px"}} />} onClick={() => history.push("/profile")}>
                Профиль
            </MenuItem>
            <MenuItem icon={<LogoutOutlined style={{fontSize: "20px"}}/>} onClick={handleLogout}>
                Выйти
            </MenuItem>
        </Menu>
      )

    return (
        <Dropdown overlay={menu} style={{alignItems:"center"}}>
            <SPrivateNavBar>
                <Right>
                    <Img src={userData.userImageModel ? userData.userImageModel.userImageUrl : defaultUserAva}/>
                </Right>
                <Left>
                    <BalanceText>Баланс:</BalanceText>
                    <Balance>{userData.userBalanceModel.userBalance} сом</Balance>
                </Left> 
                <DownOutlined />
            </SPrivateNavBar>
        </Dropdown>
    )
}

const SPrivateNavBar = styled(Flex)`
    height: 100%;
    justify-content:space-between;
    border-left: 1px solid #e3e3e3;
    padding-left: 10px;
    gap: 15px;
    cursor: pointer;
    align-items:center;
`
const Left = styled(Flex)`
    flex-direction:column;
    padding: 10px 0px;
`
const BalanceText = styled.p`
    font-size: 14px;
    margin: 0;
    color: gray;
`
const Balance = styled.h3`
    font-size: 20px;
    font-weight: bold;
    margin: 0;

`
const Right = styled(Flex)`
    width: 60px;
    padding: 10px 0px
`
const Img = styled.img`
    border-radius: 100%;
    width: 100%;
    height: 100%;
    object-fit:cover;
    background-position:center;
`
const MenuItem = styled(Menu.Item)`
    font-size: 20px;
`