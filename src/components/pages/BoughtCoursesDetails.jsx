import React, {useEffect} from 'react';
import Banner from "../common/PublicComponents/Main/Banner";
import Content from "../common/PublicComponents/Main/Content";
import Flex from "../../UI/Flex";
import {CommentOutlined, LikeOutlined} from "@ant-design/icons";
import defaultCourseImage from "../../media/defultCourseImage.png";
import CommentBlock from "../common/PublicComponents/CourseDetails/CommentBlock";
import RightBar from "../common/PublicComponents/CourseDetails/RightBar";
import styled from "styled-components";
import {Collapse} from "antd";
import {DARK_BLACK, WHITE} from "../../media/colors";
import {useDispatch, useSelector} from "react-redux";
import useFetching from "../../hooks/useFetching";
import {clearCourseDetails, getCourseDetails} from "../../redux/actions/actions";


const { Panel } = Collapse;

const BoughtCoursesDetails = () => {
    const id = 3
    const dispatch = useDispatch()

    const [fetchData, loading, error] = useFetching(async id => {
        dispatch(getCourseDetails(id))
    })
    const course = useSelector(state => state.courses.course)

    useEffect(() => {
        fetchData(id)

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
                                <Author>Уроков: {course.lessons && course.lessons.length}</Author>
                            </Flex>
                            <Flex gap="10px" color="#fff" align="center">
                                <Author>Автор: {course.courseModel && course.courseModel.userId}</Author>
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
                        <Flex direction="column" align="flex-end">
                            <Price>{course.courseModel && course.courseModel.price} сом</Price>
                            <ButBtn>Купить</ButBtn>
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
                    <MyHeader>1 урок</MyHeader>
                    <VideoPart>
                        <iframe width="100%" height="500px" src="https://www.youtube.com/embed/hpR-X2hTcqg"
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen></iframe>
                    </VideoPart>
                </LeftContent>
                <RightContent>
                    <MyHeader>1 урок</MyHeader>
                    { course.lessons && course.lessons.map((lesson,index)=>{
                        return <div key={index}>{index+1} урок</div>
                    })

                    }
                </RightContent>
                {/*<LeftContent>*/}
                {/*    <InfoBlock>*/}
                {/*        <BlockHeader>*/}
                {/*            <HeaderTitle>Информация о курсе</HeaderTitle>*/}
                {/*            <HeaderHr></HeaderHr>*/}
                {/*        </BlockHeader>*/}
                {/*        <Flex width="100%" >*/}
                {/*            <InfoText>{course.courseModel && course.courseModel.courseInfo}</InfoText>*/}
                {/*        </Flex>*/}
                {/*    </InfoBlock>*/}
                {/*    <LessonsBlock>*/}
                {/*        <BlockHeader>*/}
                {/*            <HeaderTitle>Материалы курса</HeaderTitle>*/}
                {/*            <HeaderHr></HeaderHr>*/}
                {/*        </BlockHeader>*/}
                {/*        <LessonList>*/}
                {/*            <MyCollapse>*/}
                {/*                {*/}
                {/*                    course.lessons &&*/}
                {/*                    course.lessons.map((lesson, index) =>*/}
                {/*                        <MyPanel header={`Урок ${index + 1}`} key={index}>*/}
                {/*                            <LessonContent>*/}
                {/*                                <VideoPart>*/}
                {/*                                    <iframe*/}
                {/*                                        width="560"*/}
                {/*                                        height="315"*/}
                {/*                                        src={lesson.lessonUrl}*/}
                {/*                                        title="YouTube video player"*/}
                {/*                                        frameborder="0"*/}
                {/*                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"*/}
                {/*                                        allowfullscreen></iframe>*/}
                {/*                                </VideoPart>*/}
                {/*                                <InfoPart>*/}
                {/*                                    <BlockHeader>*/}
                {/*                                        <HeaderTitle>Описание урока</HeaderTitle>*/}
                {/*                                        <HeaderHr></HeaderHr>*/}
                {/*                                    </BlockHeader>*/}
                {/*                                    <p>*/}
                {/*                                        {lesson.lessonInfo}*/}
                {/*                                    </p>*/}
                {/*                                </InfoPart>*/}
                {/*                            </LessonContent>*/}
                {/*                        </MyPanel>*/}
                {/*                    )*/}
                {/*                }*/}
                {/*            </MyCollapse>*/}
                {/*        </LessonList>*/}
                {/*    </LessonsBlock>*/}
                {/*    <CommentBlock />*/}
                {/*</LeftContent>*/}
            </ContentWrapper>
        </div>
    )
}

// CONTENT

const ContentWrapper = styled(Flex)`
    width: 100%;
    padding: 50px;
    justify-content:space-between
`

const MyHeader = styled.div`
    width:100%;
`

const LeftContent = styled(Flex)`
    width: 70%;
    // align-items:center;
    flex-direction: column;
   border: 2px solid ${DARK_BLACK}
`
const RightContent = styled(Flex)`
    align-items:center;
    flex-direction:column;
    width: 30%;
    border: 2px solid ${DARK_BLACK}
    
`
const VideoPart = styled(Flex)` 
    width: 100%;
    height:500px;
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
    width: 30%;
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
    width: 80%;
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
    width: 20%;
    height: 100%;
    align-items:center;
`
const ButBtn = styled.button`
    border: none;
    cursor:pointer;
    padding: 3px 50px;
    background: ${WHITE};
    border-radius: 5px;
    font-size: 18px;

    &:hover {
        opacity: 0.7
    }
`
export default BoughtCoursesDetails;