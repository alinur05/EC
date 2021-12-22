import React from 'react'
import styled from 'styled-components'
import Flex from '../../../../../../UI/Flex'

export default function LessonList({data}) {
    return (
        <SLessonList>
            {
                data.map(course => 
                    <Card>
                        Card
                    </Card>
                )
            }
        </SLessonList>
    )
}

const NextBtn = styled.button`
    font-size: 20px;
    border: 1px solid #e3e3e3;
    background: none;
    cursor:pointer;
    border-radius: 5px;
    padding: 5px 8px;
    &:hover {
     border: 1px solid #aeaeae;
    }
`
const Card = styled(Flex)`
    width: 100%;
    background: #fff;
    box-shadow: 0 0 30px #e3e3e3;
    border-radius: 5px;   
`
const SLessonList = styled(Flex)`
    flex-direction:column;
    gap: 10px;
`
