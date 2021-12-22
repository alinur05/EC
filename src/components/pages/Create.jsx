import React, { useEffect, useState } from 'react'
import ContentWrapper from '../../UI/ContentWrapper'
import Title from '../../UI/Title'
import { Steps } from 'antd';
import styled from 'styled-components'
import Flex from '../../UI/Flex'
import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import {DARK_BLACK} from '../../media/colors'
import CourseLessons from '../common/PrivateComponents/Profile/Cabinet/Create/CourseLessons';
import CourseBody from '../common/PrivateComponents/Profile/Cabinet/Create/CourseBody';
import { useDispatch } from 'react-redux';
import { createCourse, nextStep, resetSteps, setCreateErr } from '../../redux/actions/actions';
import { getLocalStorage } from '../../utiles';
import CourseSetImage from '../common/PrivateComponents/Profile/Cabinet/Create/CourseSetImage';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../../UI/Loader';
import useFetching from '../../hooks/useFetching';
import Error from '../../UI/Error';

const { Step } = Steps;

export default function Create() {
    const dispatch = useDispatch()
    const history = useHistory()
    const step = useSelector(state => state.create.step)
    const loading = useSelector(state => state.create.loading)

    const [fields, setFields] = useState({})

    useEffect(() => {

        return () => {
            dispatch(resetSteps())
        }
    }, [])


    const handleNextStep = () => {
        if(fields.categoryId) {
            dispatch(createCourse(fields))
        }else {
            const body = {
                ...fields,
                categoryId: 8
            }
            dispatch(createCourse(body))
        }
    }

    return (
        <ContentWrapper>
            <Flex onClick={() => {history.push("/profile")}} style={{cursor:"pointer"}} gap="5px" align="center" >
                <ArrowLeftOutlined style={{fontSize: "20px", color: "gray"}} />
                <GoBackBtn>назад</GoBackBtn>
            </Flex>     
                <Container>
                    {
                        loading ?
                            <Loader spinning={loading} />
                        :
                        <>
                            <Header>
                                <HeaderTitle>Новый курс</HeaderTitle>
                                <Steps current={step}>
                                    <Step title="Создание курса" />
                                    <Step title="Создание уроков" />
                                    <Step title="Картина курса" />
                                </Steps>    
                            </Header>
                            { step === 1 && <CourseBody onClick={handleNextStep} fields={fields} setFields={setFields}/>}
                            { step === 2 && <CourseLessons onClick={handleNextStep} />}
                            { step === 3 && <CourseSetImage onClick={handleNextStep} />}   
                        </>
                    }
                </Container>
        </ContentWrapper>
    )
}


const HeaderTitle = styled.h3`
    font-size: 24px;
    margin: 0;
`
const Header = styled(Flex)`
    width: 100%;
    align-items:center;
    flex-direction:column;
    padding-bottom: 10px;
    border-bottom: 1px solid #e3e3e3;
    gap: 10px;
`
const Container = styled(Flex)`
flex-direction:column;
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