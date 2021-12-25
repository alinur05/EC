import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ContentWrapper from '../../UI/ContentWrapper'
import styled from 'styled-components'
import Flex from '../../UI/Flex'
import { useSelector } from 'react-redux'
import { DARK_BLACK, RED, WHITE, YELLOW } from '../../media/colors'
import { CommentOutlined, LikeOutlined } from '@ant-design/icons'
import defaultCourseImage from '../../media/defultCourseImage.png'
import { useDispatch } from 'react-redux'
import { clearBoughtCourseData, setBoughtData } from '../../redux/actions/actions'
import Loader from '../../UI/Loader'
import Player from '../common/PrivateComponents/Bought/Player'
import { getImageOnCategory } from '../../utiles'

export default function BoughtCourse() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const course = useSelector(state => state.bought.data) || {}
    const loading = useSelector(state => state.bought.loading)
    const error = useSelector(state => state.bought.error)

    useEffect(() => {
        dispatch(setBoughtData(id))

        return () => dispatch(clearBoughtCourseData())
    }, [])

    return (
        loading ?
            <Loader  />
        :

        <>  
        
            <IntroSection>
                <LeftSide>
                    <Flex width="100%" direction='column'>
                        <Title>{course.courseModel && course.courseModel.courseName}</Title>
                        <IntroDesc>{course.courseModel && course.courseModel.courseShortInfo}</IntroDesc>
                    </Flex>
                    <Flex width="100%" justify="space-between">
                        <Flex direction="column">
                            <Flex gap="10px" color="#fff" align="center">
                                <Author>Уроков: {course.lessonCount && course.lessonCount}</Author>
                            </Flex>
                            <Flex gap="10px" color="#fff" align="center">
                                <Author>Автор: {course.authorFullName}</Author>
                            </Flex>
                            <Flex gap="10px">
                                <Flex gap="5px" align="center">
                                    <Like>{course.likes && course.likes.length}</Like>
                                    <LikeOutlined style={{fontSize: "16px", color:'#fff',}} />
                                </Flex>
                                <Flex gap="5px" align="center">
                                    <Comment>{course.likes && course.likes.length}</Comment>
                                    <CommentOutlined style={{fontSize: "16px", color: '#fff'}} />
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </LeftSide>
                <RightSide>
                    <Image
                        src={course.imageModel && course.imageModel.courseImageUrl ? course.imageModel.courseImageUrl: getImageOnCategory(course.courseModel && course.courseModel.categoryId)}
                    />
                </RightSide>
            </IntroSection>
            <Player />
    </>
    )
}


const IntroSection = styled(Flex)`
    width: 100%;
    height: 250px;
    background: ${DARK_BLACK};
`
const LeftSide = styled(Flex)`
    width: 65%;
    height: 100%;
    padding: 50px;
    flex-direction:column;
    justify-content:space-between;
    gap: 20px;
`
const Title = styled.h2`
    margin: 0;
    font-size: 32px;
    color: #fff;
    font-weight: bold;
    line-height: 35px;
`
const IntroDesc = styled.p`
    margin: 0;
    font-size: 18px;
    color: #fff;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const Like = styled.span`
    font-size: 16px;
    color: #fff;
`
const Comment = styled.span`
    font-size: 16px;
    color: #fff;
`
const Author = styled.span`
    font-size: 16px;
    color: #fff;
`
const Price = styled.h3`
    font-size: 28px;
    color: #fff;
`
const RightSide = styled(Flex)`
    width: 35%;
    height: 100%;
    align-items:center;
`
const ButBtn = styled.button`
    border: none;
    cursor:pointer;
    padding: 3px 50px;
    background: ${YELLOW};
    border-radius: 5px;
    font-size: 18px;
`