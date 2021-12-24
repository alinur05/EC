import { EditOutlined, EyeOutlined, LockOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import styled from 'styled-components'
import { DARK_BLACK, WHITE } from '../../../../../../../media/colors'
import Flex from '../../../../../../../UI/Flex'
import { Modal, Button } from 'antd';
import List from './List'
import Header from './Header'

export default function LessonsBlock({data, id}) {
    return (
        <SLessonsBlock>
            <Header id={id}/>
            <List data={data} />
        </SLessonsBlock>
    )
}

const SLessonsBlock = styled(Flex)`
    flex-direction:column;
    width: 100%;
    box-shadow: 0 0 30px #e3e3e3;
`