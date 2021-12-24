import React from 'react'
import styled from 'styled-components'
import Flex from '../../../../../../../UI/Flex'

export default function InfoBlock({data}) {
    return (
        <SInfoBlock>
            info block
        </SInfoBlock>
    )
}

const SInfoBlock = styled(Flex)`
    width: 100%;
    box-shadow: 0 0 30px #e3e3e3;
    padding: 10px;
    flex-direction:column;
`