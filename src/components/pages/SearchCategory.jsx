import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ContentWrapper from '../../UI/ContentWrapper'
import { useDispatch } from 'react-redux'
import { clearCategoryCourses, clearCourseDetails, getCourseByCategory } from '../../redux/actions/actions'
import Flex from '../../UI/Flex'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { CommentOutlined, LikeOutlined } from '@ant-design/icons'
import defaultCourseImage from '../../media/defaultUserAva.png'
import Title from '../../UI/Title'
import UnFound from '../../UI/UnFound'
import CourseCard from '../common/PublicComponents/Search/CourseCard'
import Loader from '../../UI/Loader'
import Error from '../../UI/Error'

export default function SearchCategory() {
    const {categoryName} = useParams()
    const dispatch = useDispatch()
    const courses = useSelector(state => state.courses.categoryCourses) || []
    const history = useHistory()
    const loading = useSelector(state => state.courses.loading)
    const error = useSelector(state => state.courses.error)

    useEffect(() => {
        dispatch(getCourseByCategory(categoryName))

        return () => dispatch(clearCategoryCourses())
    }, [categoryName])

    return (
        <ContentWrapper>
            {
                loading ?
                    <Loader size="64px" />
                    :
                
                    error ?
                        <Error text={error} />
                    :   

                    courses.length ?
                        <>
                            <Title>Курсы по теме {categoryName}</Title>
                            <Courses>
                                {
                                    courses.map(course => 
                                        <CourseCard data={course} onClick={() => history.push(`/courses/details/${course.courseModel.id}`)} />
                                    )
                                }
                            </Courses>
                        </>
                    :
                        <UnFound text={`К сожелению по теме ${categoryName} нечего не найдено..`} />
            }
        </ContentWrapper>
    )
}

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