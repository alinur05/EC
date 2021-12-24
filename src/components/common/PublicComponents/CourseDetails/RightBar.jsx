import Modal from 'antd/lib/modal/Modal'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { DARK_BLACK, WHITE, YELLOW } from '../../../../media/colors'
import { purchaseCourse } from '../../../../redux/actions/actions'
import Flex from '../../../../UI/Flex'
import { Button, notification } from 'antd';

export default function RightBar({cost, lessons, courseId}) {
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    const error = useSelector(state => state.purchase.error)

    const openNotification = msg => {
        notification.open({
          message: msg
        })
      }
      
    const handleBuyCourse = () => {
        dispatch(purchaseCourse(courseId))   
        
        if(!error) {
            setVisible(false)
        }else {
            openNotification(error)
        }
    }


    
    return (
        <SRightBar>
            <CostBlock>
                <Cost>{cost} cом</Cost>
            </CostBlock>
            <Body>
                <BuyBtn onClick={() => setVisible(true)}>Купить</BuyBtn>
                <Modal
                    visible={visible}
                    footer={false}
                    header={false}
                    onCancel={() => setVisible(false)}
                    bodyStyle={{paddingTop: "50px"}}
                >
                    <ModalContent>
                        <Prompt>К оплате: {cost} сом</Prompt>
                        <Purchase onClick={handleBuyCourse}>Купить</Purchase>
                    </ModalContent>
                </Modal>
                <span style={{fontSize: "16px"}}>Этот курс включает:</span>
                <List>
                    <Li>{lessons} уроков</Li>
                    <Li>Полный пожизненный доступ</Li>
                    <Li>Доступ через мобильные устройства и телевизор</Li>
                </List>
            </Body>
        </SRightBar>
    )
}

const Purchase = styled.button`
    border: 1px solid #e3e3e3;
    padding: 3px 8px;
    font-size: 22px;
    background: none;
    color: #252525;
    cursor:pointer;
    &:hover {
        border: 1px solid ${DARK_BLACK};
        color: #000;
    }
`
const Prompt = styled.h3`
    font-size: 24px;
    color: #000;
    margin: 0;
`
const ModalContent = styled(Flex)`
    width: 100%;
    border: 1px solid #e3e3e3;
    padding: 10px;  
    align-items:center;
    cursor:pointer;
    justify-content:space-between;
    &:hover {
        border: 1px solid ${DARK_BLACK};
    }
`
const Li = styled.li`
    color: gray;
    font-size: 14px;
`
const List = styled.ul`
    margin: 0;
    padding: 0;
    display:flex;
    flex-direction:column;
    padding-left: 15px;
`
const BuyBtn = styled.button`
    width: 100%;
    text-align:center;
    padding: 5px 0px;
    background: ${YELLOW};
    border-radius: 5px;
    cursor:pointer;
    font-size: 18px;
    border: none;
`
const Body = styled(Flex)`
    width: 100%;
    flex-direction:column;
    gap: 5px;

`
const Cost = styled.h1`
    margin: 0;
    font-size: 36px;
`
const CostBlock = styled(Flex)`
    width: 100%;
`
const SRightBar = styled(Flex)`
    width: 25%;
    position: sticky;
    top: 20px;
    border-radius: 5px;
    background: #fff;
    box-shadow: 0 0 30px #e3e3e3;
    padding: 15px;
    flex-direction:column;
`