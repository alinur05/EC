import React, { useEffect } from 'react'
import styled from 'styled-components'
import Flex from '../../../../UI/Flex'
import ContentWrapper from '../../../../UI/ContentWrapper'
import { useDispatch, useSelector } from 'react-redux'
import useFetching from '../../../../hooks/useFetching'
import { cleanCourses, getCoures } from '../../../../redux/actions/actions'
import Loader from '../../../../UI/Loader'
import Error from '../../../../UI/Error'
import Cards from './Cards/Cards'
import UnFound from '../../../../UI/UnFound'

export default function Content() {
    const dispatch = useDispatch()
    const courses = useSelector(state => state.courses.allCourses)

    return (
        <SContent>
                {
                    courses.length ?
                    <ContentHeader>
                        <Title>Курсы</Title>
                        <P>Выбирайте из {courses.length} онлайн-видеокурсов;</P>
                    </ContentHeader>
                    :
                    <UnFound 
                        text="Пока нет курсов.."
                    />
                }

            <CoursesContent>
                <Cards />
            </CoursesContent>
        </SContent>
    )
}

const SContent = styled(ContentWrapper)`
    height: 100px;
`
const ContentHeader = styled(Flex)`
    width: 100%;
    flex-direction:column;
    border-bottom: 1px solid #e3e3e3;
`
const Title = styled.h2`
    font-size: 36px;
    margin: 0;
`
const P = styled.p`
    font-size: 16px;
`
const CoursesContent = styled(Flex)`
    flex-direction:column;
    gap: 30px;
`