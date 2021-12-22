import React from 'react';
import styled from "styled-components";
import {DARK_BLACK} from "../../../../media/colors";

const BoughtCourseItem = ({lessonId,lesson}) => {
    return (
        <Item>
            {lessonId} урок
        </Item>
    );
};


const Item = styled.div`
    cursor: pointer;
    width:100%;
    padding: 7px;
    font-size:16px;
    border-bottom: 1px solid ${DARK_BLACK};
    color: ${DARK_BLACK};

`


export default BoughtCourseItem;