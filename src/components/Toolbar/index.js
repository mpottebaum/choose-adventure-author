import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    setGridViewX,
    setGridViewY
} from '../../store/gridViewCenter/actions'
import { setToolbarAction, clearToolbarAction } from '../../store/toolbarAction/actions'
import toolbarActions from '../../constants/toolbarActions'
import { colors } from '../../constants/theme'

import Arrows from './cmps/Arrows'
import Button from '../Button'

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
        <div>
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
        </div>
    )
}

export default Toolbar