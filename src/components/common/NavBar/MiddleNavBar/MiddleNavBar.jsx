import { SearchOutlined } from '@ant-design/icons'
import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { DARK_BLACK } from '../../../../media/colors'
import Flex from '../../../../UI/Flex'
import SearchCategory from './SearchCategory/SearchCategory'
import SearchField from './SearchField/SearchField'

export default function MiddleNavBar() {
    return (
        <SMiddleNavBar>
            <SearchCategory />
            <SearchField />
            <AboutLink to="/about">О нас</AboutLink>
        </SMiddleNavBar>
    )
}

const SMiddleNavBar = styled(Flex)`
    gap: 20px;
    align-items:center;
`
const AboutLink = styled(NavLink)`
    color: ${DARK_BLACK};
    font-size: 18px;
    &:hover {
        color: ${DARK_BLACK};
    }
`