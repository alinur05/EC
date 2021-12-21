import React from 'react'
import ContentWrapper from '../../UI/ContentWrapper'
import Title from '../../UI/Title'
import { Steps } from 'antd';
import styled from 'styled-components'
import Flex from '../../UI/Flex'
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Step } = Steps;
export default function Create() {

    return (
        <ContentWrapper>
            <Flex style={{cursor:"pointer"}} gap="5px" align="center">
                <ArrowLeftOutlined style={{fontSize: "20px", color: "gray"}} />
                <GoBackBtn>назад</GoBackBtn>
            </Flex>     
            <Container>
                Contaienr
            </Container>
        </ContentWrapper>
    )
}


const Container = styled(Flex)`
    width: 600px;
    margin: 20px auto;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 30px #e3e3e3;
    padding: 10px;
`
const GoBackBtn = styled.button`
    background: none;
    border: none;
    cursor:pointer;
    color: gray;
    font-size: 24px;
`