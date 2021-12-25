import React, { useEffect } from 'react'
import styled from 'styled-components'
import Flex from '../../UI/Flex'
import ContentWrapper from '../../UI/ContentWrapper'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { cleanUpMyCourse, getMyCourseData } from '../../redux/actions/actions'
import Loader from './../../UI/Loader'
import Error from './../../UI/Error'
import Title from './../../UI/Title'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { ArrowLeftOutlined } from '@ant-design/icons'
import LessonsBlock from '../common/PrivateComponents/Profile/Cabinet/MyCourse/Lessons/LessonsBlock'
import InfoBlock from '../common/PrivateComponents/Profile/Cabinet/MyCourse/Info/InfoBlock'

export default function MyCourse() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const data = useSelector(state => state.myCourse.myCourse)
    const loading = useSelector(state => state.myCourse.loading)

    useEffect(() => {
        dispatch(getMyCourseData(id))

        return () => dispatch(cleanUpMyCourse())
    }, [])


    return (
        loading ?
        <Loader size="36px" />
    :

    <ContentWrapper>
        <Flex onClick={() => {history.push("/profile")}} style={{cursor:"pointer"}} gap="5px" align="center" >
            <ArrowLeftOutlined style={{fontSize: "20px", color: "gray"}} />
            <GoBackBtn>назад</GoBackBtn>
        </Flex>    
        <Title size="36px">{data.courseModel && data.courseModel.courseName}</Title>
        <BlocksWrapper>
            <InfoBlock data={data}/>
            <LessonsBlock data={data.lessons} id={id} />
        </BlocksWrapper>
    </ContentWrapper>
    )
}

const GoBackBtn = styled.button`
    background: none;
    border: none;
    cursor:pointer;
    color: gray;
    font-size: 24px;
`
const BlocksWrapper = styled(Flex)`
    width: 100%;
    gap: 50px;
`