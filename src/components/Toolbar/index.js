import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    setGridViewX,
    setGridViewY
} from '../../store/gridViewCenter/actions'
import { setToolbarAction, clearToolbarAction } from '../../store/toolbarAction/actions'
import toolbarActions from '../../constants/toolbarActions'

const { move: moveAction } = toolbarActions

const Toolbar = () => {
    const { gridViewCenter, selStoryNodeId, selChoiceId, toolbarAction } = useSelector(state => state)
    const dispatch = useDispatch()

    const onMoveClick = () => {
        if(toolbarAction === moveAction) {
            dispatch(clearToolbarAction())
        } else if(selStoryNodeId || selChoiceId) {
            dispatch(setToolbarAction(moveAction))
        }
    }

    return <div>
        <button onClick={() => dispatch(setGridViewY(gridViewCenter.y + 1))}>^</button>
        <button onClick={() => dispatch(setGridViewY(gridViewCenter.y - 1))}>v</button>
        <button onClick={() => dispatch(setGridViewX(gridViewCenter.x - 1))}>&lt;</button>
        <button onClick={() => dispatch(setGridViewX(gridViewCenter.x + 1))}>&gt;</button>
        <button onClick={onMoveClick}>MOVE</button>
    </div>
}

export default Toolbar