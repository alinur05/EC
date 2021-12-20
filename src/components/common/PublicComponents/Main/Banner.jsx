import React from 'react'
import styled from 'styled-components'
import Flex from '../../../../UI/Flex'
import {Carousel} from 'antd'
import { DARK_BLACK } from '../../../../media/colors'
import fon1 from '../../../../media/fon1.png'
import fon2 from '../../../../media/fon2.jpg'

export default function Banner() {

    const handleChange = (a, b, c) => {
        // console.log(a, b, c)
    }
    
    return (
        <SBanner afterChange={handleChange} autoplay dots={false}>
            <FirstBanner>
                <SBanBlock>
                    <Title>Подготовьтесь к сертификации ИТ</Title>
                    <P>Загляните в будущее ИТ. Начните обучение на сертификацию AWS, CompTIA A+ и многие другие.</P>
                </SBanBlock>
            </FirstBanner>
            <SecondBanner>
                <SBanBlock>
                    <Title>Эффективное обучение</Title>
                    <P>Навыки для светлого будущего. Начните действовать вместе с нами.</P>
                </SBanBlock>
            </SecondBanner>
        </SBanner>
    )
}

const FirstBanner = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${fon1});
    background-size:cover;
    object-fit:cover;
`
const SecondBanner = styled.div`
    width: 100%;
    height: 100%;
    object-fit:cover;
    background-image: url(${fon2});
    background-size:cover;
`
const SBanner = styled(Carousel)`
    width: 100%;
    height: 350px;
`
const SBanBlock = styled(Flex)`
    width: 350px;
    background: #fff;
    flex-direction:column;
    border-radius: 5px;
    margin: 70px;
    margin-left: 50px;
    padding: 10px 15px;
    gap: 15px;
`
const Title = styled.h3`
    margin: 0;
    font-size: 36px;
    color: ${DARK_BLACK};
    font-weight: bold;
    line-height: 40px;
`
const P = styled.p`
    margin: 0;
    font-size: 18px;
`