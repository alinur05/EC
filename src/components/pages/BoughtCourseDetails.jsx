import React, {useEffect, useState} from 'react';
import {Collapse} from "antd";
import styled from "styled-components";
import {CommentOutlined, LikeOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";

import Flex from "../../UI/Flex";
import defaultCourseImage from "../../media/defultCourseImage.png";
import {DARK_BLACK, WHITE} from "../../media/colors";
import useFetching from "../../hooks/useFetching";
import {clearCourseDetails, getCourseDetails} from "../../redux/actions/actions";

const { Panel } = Collapse;

const BoughtCourseDetails = () => {

    const id = 1
    const dispatch = useDispatch()
    const course = useSelector(state => state.courses.course)
    let [lessonInfo,setlessonInfo] = useState({
        url:course.lessons?.[0].lessonUrl,
        lessonInfo:course.lessons?.[0].lessonInfo,
        id: 1
    })
    const [fetchData, loading, error] = useFetching(async id => {
        dispatch(getCourseDetails(id))
    })

    const parcer = (url,info,index)=>{
        if(url.split('watch?v=')){
            setlessonInfo({...lessonInfo,url:url.replace(/watch/g,'embed'),lessonInfo:info,id:index})

        }else{
            setlessonInfo({...lessonInfo,url,lessonInfo:info,id:index})
        }
    }

    console.log(course.lessons?.[0])

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

                    </Flex>
                </LeftSide>
                <RightSide>
                    <Image
                        src={course.imageModel && course.imageModel.courseImageUrl ? course.imageModel.courseImageUrl : defaultCourseImage}
                    />
                </RightSide>
            </IntroSection>
            <ContentWrapper>
                <LeftContent>

                    <MyHeader><HeaderInfo>{lessonInfo.id} урок</HeaderInfo></MyHeader>
                    <VideoPart>
                        <iframe width="100%" height="500px" src={lessonInfo.url || course.lessons?.[0].lessonUrl}
                                title="YouTube video player" frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen></iframe>
                    </VideoPart>
                    <LessonInfo>{lessonInfo.lessonInfo || course.lessons?.[0].lessonInfo}</LessonInfo>
                </LeftContent>
                <RightContent>
                    <MyHeader style={{borderBottom:'1px solid black'}}><HeaderInfo>{course.lessons?.length} уроков</HeaderInfo></MyHeader>
                    <Lessons>
                        { course.lessons && course.lessons.map((lesson,index)=>{
                            return <Item key={index} onClick={() => parcer(lesson.lessonUrl,lesson.lessonInfo,index+1)}>{index+1} урок</Item>
                        })
                        }
                    </Lessons>

                </RightContent>
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
    padding: 10px;
`
const HeaderInfo = styled.p`
    font-size: 20px;
    margin:0;

`
const LeftContent = styled(Flex)`
    width: 70%;
    flex-direction: column;
   border: 2px solid ${DARK_BLACK}
`
const RightContent = styled(Flex)`
    max-height: 555px;
    padding: 8px;
    align-items:start;
    flex-direction:column;
    width: 30%;
    border: 2px solid ${DARK_BLACK}
    
`
const Lessons = styled(Flex)`
    flex-direction: column;
    overflow: auto;
    width:100%;
`
const VideoPart = styled(Flex)` 
    width: 100%;
    height:500px;
`
const LessonInfo = styled.h3`
    font-size:22px;
    margin: 10px

`
const Item = styled.div`
    cursor: pointer;
    width:100%;
    padding: 7px;
    font-size:16px;
    border-bottom: 1px solid ${DARK_BLACK};
    color: ${DARK_BLACK};

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

export default BoughtCourseDetails;