import { CommentOutlined, LikeOutlined } from '@ant-design/icons'
import React from 'react'
import styled from 'styled-components'
import Flex from '../../../../UI/Flex'
import defaultCourseImage from '../../../../media/defaultUserAva.png'

export default function CourseCard({data, onClick}) {

    return (    
        <Card onClick={onClick}>
                                                <CardTop>
                                                    <CourseImage 
                                                        src={
                                                            data.imageModel ?
                                                                data.imageModel.courseImageUrl
                                                            :
                                                                defaultCourseImage
                                                            }
                                                    />
                                                </CardTop>
                                                <CardBody>
                                                    <Flex width="100%" direction="column">
                                                        <CourseName>{data.courseModel && data.courseModel.courseName}</CourseName>
                                                        <CourseAuthor>Автор: {data.courseModel && data.courseModel.userId}</CourseAuthor>
                                                    </Flex>
                                                    <Flex justify="space-between" width="100%" align="center">
                                                        <Flex gap="15px">
                                                            <Flex align="center" gap="3px">
                                                                <Likes>{data.likes && data.likes.length}</Likes>
                                                                <LikeOutlined style={{Fontsize: "16px"}} />
                                                            </Flex>
                                                            <Flex align="center" gap="3px">
                                                                <Comments>{data.comments && data.comments.length}</Comments>
                                                                <CommentOutlined style={{Fontsize: "16px"}} /> 
                                                            </Flex>
                                                        </Flex>
                                                        <Flex>
                                                            <Cost align="center">
                                                                {data.courseModel && data.courseModel.price + " "}
                                                                сом
                                                            </Cost>
                                                        </Flex>
                                                    </Flex>
                                                </CardBody>
                                            </Card>  
    )
}


const CourseAuthor = styled.span`
    font-size: 14px;
    color: #6A6F73;
`
const Likes = styled.span`
    font-size: 20px;
    color: #6A6F73;
`
const Comments = styled.span`
    font-size: 20px;
    color: #6A6F73;
`
const Cost = styled.h3`
    margin: 0;
    font-size: 24px;
`
const CardBody = styled(Flex)`
    width: 100%;
    height: 55%;
    padding: 5px 10px;
    flex-direction:column;
    justify-content:space-between;
`
const CourseName = styled.h3`
    margin: 0;
    font-size: 20px;
    font-weight: bold;
    line-height: 25px;
`
const CardTop = styled(Flex)`
    width: 100%;
    height: 45%;

`
const CourseImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit:cover;
    background-position:center;
`
const Card = styled(Flex)`
    width: 250px;
    height: 250px;
    border-radius: 5px;
    box-shadow: 0 0 30px #e3e3e3;
    background: #fff;
    flex-direction:column;
    cursor:pointer;
    &:hover {
        box-shadow: 0 0 30px #aeaeae;
    }
`