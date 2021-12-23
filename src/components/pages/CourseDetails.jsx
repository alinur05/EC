import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import styled from 'styled-components'
import useFetching from '../../hooks/useFetching'
import { DARK_BLACK, RED, WHITE, YELLOW } from '../../media/colors'
import { clearCourseDetails, getCourseDetails } from '../../redux/actions/actions'
import Flex from '../../UI/Flex'
import UnFound from '../../UI/UnFound'
import defaultCourseImage from '../../media/defultCourseImage.png'
import { CaretRightOutlined, CommentOutlined, LikeOutlined, LockOutlined } from '@ant-design/icons'
import { Collapse } from 'antd';
import CommentBlock from '../common/PublicComponents/CourseDetails/CommentBlock'
import RightBar from '../common/PublicComponents/CourseDetails/RightBar'
import {isGoodUrl} from '../../utiles/index'

const { Panel } = Collapse;

export default function CourseDetails() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const course = useSelector(state => state.courses.course)
    const loading = useSelector(state => state.courses.loading)
    const error = useSelector(state => state.courses.error)

    useEffect(() => {
        dispatch(getCourseDetails(id))
        window.scrollTo(0, 0)

        return () => {
            dispatch(clearCourseDetails())
        }
    }, [])


    return (
        <div>
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
                        src={course.imageModel && course.imageModel.courseImageUrl ? course.imageModel.courseImageUrl: defaultCourseImage}
                    />
                </RightSide>
            </IntroSection>
            <ContentWrapper>
                <LeftContent>
                    <InfoBlock>
                        <BlockHeader>
                            <HeaderTitle>Информация о курсе</HeaderTitle>
                            <HeaderHr></HeaderHr>
                        </BlockHeader>
                        <Flex width="100%" >
                            <InfoText>{course.courseModel && course.courseModel.courseInfo}</InfoText>
                        </Flex>
                    </InfoBlock>    
                    <LessonsBlock>
                        <BlockHeader>
                            <HeaderTitle>Материалы курса</HeaderTitle>
                            <HeaderHr></HeaderHr>
                        </BlockHeader>
                        <LessonList>
                            <MyCollapse>
                            {
                                course.lessons &&
                                    course.lessons.map((lesson, index) => 
                                        <MyPanel header={`Урок ${index + 1}`} key={index}>
                                            {
                                                lesson.isVisible ?
                                                    <LessonContent>
                                                            {
                                                                isGoodUrl(lesson.lessonUrl) &&
                                                                <VideoPart>
                                                                    <iframe 
                                                                    width="560" 
                                                                    height="315" 
                                                                    src={lesson.lessonUrl}
                                                                    title="YouTube video player" 
                                                                    frameborder="0"
                                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                                    allowfullscreen></iframe>
                                                                
                                                                </VideoPart>
                                                            }
                                                        <InfoPart>
                                                            <BlockHeader>
                                                                <HeaderTitle>Описание урока</HeaderTitle>
                                                                <HeaderHr></HeaderHr>
                                                            </BlockHeader>
                                                            <p>
                                                                {lesson.lessonInfo}
                                                            </p>
                                                        </InfoPart>
                                                    </LessonContent>
                                                :
                                                <UnVisibleContent>
                                                    <LockOutlined style={{fontSize: "32px"}} />
                                                    <WarnText>Урок доступен после покупки..</WarnText>
                                                </UnVisibleContent>
                                            }
                                        </MyPanel>
                                    )
                            }
                            </MyCollapse>
                        </LessonList>
                    </LessonsBlock>
                    <CommentBlock />
                </LeftContent>
                <RightBar cost={course.courseModel && course.courseModel.price} lessons={course.lessonCount && course.lessonCount} />
            </ContentWrapper>
        </div>
    )
}

// CONTENT

const WarnText = styled.h3`
    margin: 0;
    color: gray
`
const UnVisibleContent = styled(Flex)`
    flex-direction: column;
    justify-content:center;
    align-items:center;
    padding: 20px 0px;
    color: gray
`
const VideoPart = styled(Flex)` 
    width: 50%;
`
const InfoPart = styled(Flex)`
    flex-direction:column;
    padding: 0px 20px
`
const LessonContent = styled(Flex)`
    width: 100%;
`
const MyPanel = styled(Panel)`
    width: 100%;
`
const MyCollapse = styled(Collapse)`
width: 100%;
    display:flex;
    flex-direction:column
`
const LessonList = styled.ul`
width: 100%;
    margin: 0;
    padding: 0;
    display:flex;
    flex-direction:column;
`
const LessonsBlock = styled(Flex)`
width: 100%;
    flex-direction:column;
`
const ContentWrapper = styled(Flex)`
    width: 100%;
    padding: 50px;
    justify-content:space-between
`
const LeftContent = styled(Flex)`
    width: 70%;
    flex-direction:column;
    gap: 50px;
`
const BlockHeader = styled(Flex)`
    width: 100%;
    flex-direction:column;
    padding-bottom: 15px;
`
const HeaderTitle = styled.h3`
    font-size: 36px;
    color: #000;
    line-height: 25px;
`
const HeaderHr = styled.hr`
    height: 2px;
    background: ${DARK_BLACK};
    width: 68px;
    border: none;
`
const InfoBlock = styled(Flex)`
    width: 100%;
    flex-direction:column;
`
const InfoText = styled(Flex)`
    font-size: 16px;
`

// INTRO


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