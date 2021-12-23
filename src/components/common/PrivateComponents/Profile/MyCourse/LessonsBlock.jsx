import React from 'react'
import styled from 'styled-components'
import Flex from '../../../../../UI/Flex'

export default function LessonsBlock({data}) {

    return (
        <SLessonsBlock>
            Lessons
        </SLessonsBlock>
    )
}

const SLessonsBlock = styled(Flex)`
    flex-direction:column;
    width: 100%;
    box-shadow: 0 0 30px #e3e3e3;
    padding: 10px;
`