import React from 'react'
import styled from 'styled-components'
import Flex from '../../../../../../../UI/Flex'
import Item from './Item'
import UnFound from '../../../../../../../UI/UnFound'

export default function List({data}) {
    return (
        <SList>
            {
                data &&
                data.length ?
                    data.map(item =>
                        <Item item={item} />
                    )
                :
                    <UnFound 
                        text="Нет уроков.."
                    />
            }
        </SList>
    )
}

const SList = styled(Flex)`
    width: 100%;
    padding: 10px 30px;
    flex-direction:column;
    gap: 15px;
`