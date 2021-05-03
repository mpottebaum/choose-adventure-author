import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    setGridViewX,
    setGridViewY
} from '../../store/gridViewCenter/actions'
import { setToolbarAction, clearToolbarAction } from '../../store/toolbarAction/actions'
import toolbarActions from '../../constants/toolbarActions'
import { colors } from '../../constants/theme'
import { TOOLBAR_HEIGHT } from '../../constants/grid'
import styled from 'styled-components'

import Arrows from './cmps/Arrows'
import Button from '../Button'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    max-height: ${TOOLBAR_HEIGHT}px;
    height: 100%;
`

const { moveAction, drawLineAction } = toolbarActions

const Toolbar = () => {
    const { gridViewCenter, selStoryNodeId, selChoiceId, toolbarAction } = useSelector(state => state)
    const dispatch = useDispatch()

    const buttonColor = action => toolbarAction === action && colors.green

    const onMoveClick = () => {
        if(toolbarAction === moveAction) {
            dispatch(clearToolbarAction())
        } else if(selStoryNodeId || selChoiceId) {
            dispatch(setToolbarAction(moveAction))
        }
    }

    const onDrawLineClick = () => {
        if(toolbarAction === drawLineAction) {
            dispatch(clearToolbarAction())
        } else if(selStoryNodeId || selChoiceId) {
            dispatch(setToolbarAction(drawLineAction))
        }
    }

    return (
        <Container>
            <Button
                onClick={onMoveClick}
                backgroundColor={buttonColor(moveAction)}
            >
                Move
            </Button>
            <Button
                onClick={onDrawLineClick}
                backgroundColor={buttonColor(drawLineAction)}
            >
                Connect
            </Button>
            <Arrows
                onGridNavUp={() => dispatch(setGridViewY(gridViewCenter.y + 1))}
                onGridNavDown={() => dispatch(setGridViewY(gridViewCenter.y - 1))}
                onGridNavLeft={() => dispatch(setGridViewX(gridViewCenter.x - 1))}
                onGridNavRight={() => dispatch(setGridViewX(gridViewCenter.x + 1))}
            />
        </Container>
    )
}

export default Toolbar