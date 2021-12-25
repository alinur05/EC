import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Flex from '../../../../../UI/Flex'
import defaultCourseImage from '../../../../../media/defultCourseImage.png'
import { CommentOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { getImageOnCategory } from '../../../../../utiles'

export default function Cards() {
    const coursesSplittedByCategories = useSelector(state => state.courses.coursesSplittedByCategories)
    const history = useHistory()

    return (
        <SCards>
            {
            coursesSplittedByCategories.map(course => 
                course.courses.length &&
                <CardWrapper key={course.categoryName}>
                    <CaregoryName>{course.categoryName}</CaregoryName>
                    <Courses>
                        {
                            course.courses.map(course => 
                                <Card onClick={() => history.push(`/courses/details/${course.courseModel.id}`)}>
                                    <CardTop>
                                        <CourseImage 
                                            src={
                                                course.imageModel ?
                                                    course.imageModel.courseImageUrl
                                                :
                                                    getImageOnCategory(course.courseModel.categoryId)
                                        }
                                        />
                                    </CardTop>
                                    <CardBody>
                                        <Flex width="100%" direction="column">
                                            <CourseName>{course.courseModel.courseName}</CourseName>
                                            <CourseAuthor>Автор: {course.authorFullName}</CourseAuthor>
                                        </Flex>
                                        <Flex justify="space-between" width="100%" align="center">
                                            <Flex gap="15px">
                                                <Flex align="center" gap="3px">
                                                    <Likes>{course.likes.length}</Likes>
                                                    <LikeOutlined style={{Fontsize: "16px"}} />
                                                </Flex>
                                                <Flex align="center" gap="3px">
                                                    <Comments>{course.comments.length}</Comments>
                                                    <CommentOutlined style={{Fontsize: "16px"}} /> 
                                                </Flex>
                                            </Flex>
                                            <Flex>
                                                <Cost align="center">
                                                    {course.courseModel.price + " "}
                                                    сом
                                                </Cost>
                                            </Flex>
                                        </Flex>
                                    </CardBody>
                                </Card>    
                            )
                        }
                    </Courses>
                </CardWrapper>
            )
            }
        </SCards>
    )
}

const SCards = styled(Flex)`
    width: 100%;
    flex-direction:column;
    gap: 30px;
`

const CardWrapper = styled(Flex)`
    width: 100%;
    flex-direction:column;
    gap: 15px;
`
const CaregoryName = styled.h3`
    font-size: 36px;
`
const Card = styled(Flex)`
    width:250px;
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
const Courses = styled(Flex)`
    width: 100%;
    flex-wrap: wrap;
    gap: 15px;
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