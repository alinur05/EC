import React from 'react'
import styled from 'styled-components'
import Flex from '../../../../../UI/Flex'
import MyCourses from './MyCourses/MyCourses'
import PurchasedCourses from './PurchasedCourses/PurchasedCourses'

export default function Cabinet() {
    return (
        <SCabinet>
            <PurchasedCourses />
            <MyCourses />
        </SCabinet>
    )
}


const SCabinet = styled(Flex)`
    width: 100%;
    justify-content:space-between;
    flex: 1 0 auto;
`