import React from 'react'
import styled from 'styled-components'
import { WHITE } from '../../../../media/colors'
import Flex from '../../../../UI/Flex'

export default function RightBar({cost, lessons}) {
    return (
        <SRightBar>
            <CostBlock>
                <Cost>{cost} cом</Cost>
            </CostBlock>
            <Body>
                <BuyBtn>Купить</BuyBtn>
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
    background: ${WHITE};
    border-radius: 5px;
    cursor:pointer;
    font-size: 18px;
    border: none;

    &:hover {
        opacity: 0.6
    }

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