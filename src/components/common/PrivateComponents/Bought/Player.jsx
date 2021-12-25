import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Flex from '../../../../UI/Flex'
import {setLesson} from '../../../../redux/actions/actions'

export default function Player() {
    const dispatch = useDispatch()
    const course = useSelector(state => state.bought.data) || {}
    const lesson = useSelector(state => state.bought.lesson)


    return (
        <SPlayer>
            <PlayerBody>
                <LessonPart>
                    <VideoBlockHeader>
                        <HeaderTitle>Урок {lesson.num}</HeaderTitle>
                    </VideoBlockHeader>
                    <Video>
                        <iframe width="560" height="315" src={lesson.lessonUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </Video>
                </LessonPart>   
                <ListPart>
                    <Flex padding="10px" justify="center" align="center" style={{fontSize: "20px"}} height="40px" width="100%"bottomLine>{course.lessonCount} уроков</Flex>
                    <LessonList direction="column" width="100%">
                        {
                            course.lessons &&
                            course.lessons.map((item, index) => 
                                <Lesson onClick={() => dispatch(setLesson({...item, num: index + 1}))} width="100%" bottomLine>
                                    <span>Урок {index + 1}</span>
                                </Lesson>    
                            )
                        }
                    </LessonList>
                </ListPart>
            </PlayerBody>
            <InfoBlock>
                <h2>Информация об уроке</h2>
                <p>{lesson.lessonInfo}</p>
            </InfoBlock>
        </SPlayer>
    )
}

const Video = styled(Flex)`
    width: 100%;
    padding: 50px;
`
const HeaderTitle = styled.h3`
    margin: 0;
`
const VideoBlockHeader = styled(Flex)`
    width: 100%;
    font-size: 20px;
    height: 40px;
    padding: 0px 30px;
    border-bottom: 1px solid #e3e3e3;
`
const Lesson = styled(Flex)`
    height: 40px;
    align-items:center;
    cursor:pointer;
    padding: 0px 30px;
    &:hover {
        background: #e3e3e3;
    }
`
const LessonList = styled(Flex)`
    width: 100%;
    overflow: scroll;
    height: 100%;
`
const InfoBlock = styled(Flex)`
    flex-direction:column;
`
const ListPart = styled(Flex)`
    width: 30%;
    height: 500px;
    flex-direction:column;
    border-left:1px solid #e3e3e3;
`
const LessonPart = styled(Flex)`
    width: 70%;
    flex-direction:column;
`
const PlayerBody = styled(Flex)`
    width: 100%;
    height: 100%;
    border: 1px solid #e3e3e3;
`
const SPlayer = styled(Flex)`
    width: 100%;
    padding: 30px;
    flex-direction:column;
`