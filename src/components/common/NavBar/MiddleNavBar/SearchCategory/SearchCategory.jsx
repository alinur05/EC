import React from 'react'
import styled from 'styled-components'
import { Menu, Dropdown } from 'antd';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import UnFound from '../../../../../UI/UnFound';

export default function SearchCategory(){
    const categories = useSelector(state => state.category.categories) || []
    const history = useHistory()

    const menu = (
        <Menu>
            {
                categories.length ?
                categories.map(item => 
                    <Clause onClick={() => history.push(`/category/${item.categoryName}`)}>  
                        {item.categoryName}
                    </Clause>
                )
                : 
                <UnFound text="Нет категорий.." size="12px" height="50px" width="110%" />
            }
        </Menu>
      )

    return (
        <Dropdown overlay={menu}>
            <SSearchCategory>
                Категории
            </SSearchCategory>
        </Dropdown>
    )
}

const Clause = styled(Menu.Item)`

`

const SSearchCategory = styled.h3`
    margin: 0;
    font-size: 18px;
    cursor: pointer;
`