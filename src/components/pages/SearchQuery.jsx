import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import styled from 'styled-components'
import { clearSearchedCourses, searchQuery } from '../../redux/actions/actions'
import ContentWrapper from '../../UI/ContentWrapper'
import Flex from '../../UI/Flex'
import Title from '../../UI/Title'
import UnFound from '../../UI/UnFound'
import CourseCard from '../common/PublicComponents/Search/CourseCard'

export default function SearchQuery() {
    const {query} = useParams()
    const searchedCourses = useSelector(state => state.courses.searchedCourses)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(searchQuery(query))

        return () => dispatch(clearSearchedCourses())
    }, [query])

    return (
        <ContentWrapper>
            {
                searchedCourses.length ?
                    <>
                        <Title>Результаты по запросу {query}</Title>
                        <Courses>
                            {
                                searchedCourses.map(course => 
                                    <CourseCard data={course} onClick={() => history.push(`/courses/details/${course.courseModel.id}`)} />
                                )
                            }
                        </Courses>
                    </>
                :
                <UnFound text={`К сожелению по запросу ${query} нечего не найдено..`} />

            }
        </ContentWrapper>
    )
}

const Courses = styled(Flex)`
    width: 100%;
    flex-wrap: wrap;
    gap: 15px;
`
