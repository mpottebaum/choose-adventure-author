import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    setGridViewX,
    setGridViewY
} from '../../store/gridViewCenter/actions'
import { setToolbarAction, clearToolbarAction } from '../../store/toolbarAction/actions'
import toolbarActions from '../../constants/toolbarActions'

import SvgToolbar from './cmps/SvgToolbar'

const { moveAction, drawLineAction } = toolbarActions

const Toolbar = ({
    width,
    height,
}) => {
    const { gridViewCenter, selStoryNodeId, selChoiceId, toolbarAction } = useSelector(state => state)
    const dispatch = useDispatch()

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
        <SvgToolbar
            onGridNavUp={() => dispatch(setGridViewY(gridViewCenter.y + 1))}
            onGridNavDown={() => dispatch(setGridViewY(gridViewCenter.y - 1))}
            onGridNavLeft={() => dispatch(setGridViewX(gridViewCenter.x - 1))}
            onGridNavRight={() => dispatch(setGridViewX(gridViewCenter.x + 1))}
            onMove={onMoveClick}
            onDrawLine={onDrawLineClick}
            height={height}
            width={width}
        />
    )
}

export default Toolbar