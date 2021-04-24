import React from 'react'
import { wrapText } from '../../../helpers/svgHelpers'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../../store/modal/actions'
import { moveStoryNode, moveChoice, drawLine } from '../../../store/storyNodes/actions'
import { selectStoryNode, deselectStoryNode } from '../../../store/selStoryNodeId/actions'
import { selectChoice, deselectChoice } from '../../../store/selChoiceId/actions'
import { setStoryNodeCoordinates, clearStoryNodeCoordinates } from '../../../store/newStoryNodeCoordinates/actions'
import modals from '../../../constants/modals'
import toolbarActions from '../../../constants/toolbarActions'
import {
    TEXT_OFFSET_X,
    TEXT_OFFSET_Y,
    TEXT_LINE_CHAR_LIMIT
} from '../../../constants/grid'

// TO DO:
// 1. wrapText: add code for first words longer than 17 chars



const { moveAction, drawLineAction } = toolbarActions
const { createStoryNodeModal } = modals

const Cell = ({
    gridY,
    gridX,
    svgX,
    svgY,
    width,
    height,
    stroke,
    strokeWidth,
    textSize,
    storyNode,
    choice,
}) => {
    const { selStoryNodeId, selChoiceId, toolbarAction } = useSelector(state => state)
    const dispatch = useDispatch()

    const fillColor = () => {
        if(storyNode) return storyNode.color || 'gray'
        if(choice) return 'yellow'
        return 'white'
    }

    const isEmpty = () => !storyNode && !choice

    const onCellClick = () => {

        if(toolbarAction) {
            switch(toolbarAction) {
                case moveAction:
                    if(isEmpty()) {
                        if(selStoryNodeId) dispatch(moveStoryNode(gridX, gridY, selStoryNodeId))
                        if(selChoiceId) dispatch(moveChoice(gridX, gridY, selChoiceId))
                    }
                    return
                case drawLineAction:
                    if(storyNode) {
                        if(selStoryNodeId) dispatch(drawLine(storyNode.id, selStoryNodeId))
                        if(selChoiceId) dispatch(drawLine(storyNode.id, selChoiceId, true))
                    }
                default:
                    return
            }
        }

        if(storyNode) {
            // select story node
            // (open modal action is in SelectedCellLayer)
            dispatch(clearStoryNodeCoordinates())
            dispatch(deselectChoice())
            dispatch(selectStoryNode(storyNode.id))
            return
        }
        if(choice) {
            // select choice
            // (open modal action is also in SelectedCellLayer)
            dispatch(clearStoryNodeCoordinates())
            dispatch(deselectStoryNode())
            dispatch(selectChoice(choice.id))
            return
        }
        // for empty cells, open create story node modal
        const coordinates = { x: gridX, y: gridY }
        dispatch(deselectStoryNode())
        dispatch(deselectChoice())
        dispatch(setStoryNodeCoordinates(coordinates))
        dispatch(openModal(createStoryNodeModal))
    }


    return (
        <g onClick={onCellClick}>
            <rect
                id={`x${gridX}y${gridY}`}
                x={svgX}
                y={svgY}
                width={width}
                height={height}
                stroke={stroke}
                fill={fillColor()}
                fillOpacity={(storyNode || choice) ? 0.7 : 0}
                strokeWidth={strokeWidth}
            />
            <text
                fontSize={textSize}
                x={svgX + TEXT_OFFSET_X}
                y={svgY + TEXT_OFFSET_Y + textSize}
            >
                {storyNode && wrapText(storyNode.name, TEXT_LINE_CHAR_LIMIT).firstLine}
                {choice && wrapText(choice.content, TEXT_LINE_CHAR_LIMIT).firstLine}
            </text>
            <text
                fontSize={textSize}
                x={svgX + TEXT_OFFSET_X}
                y={svgY + TEXT_OFFSET_Y + (textSize * 2)}
            >
                {storyNode && wrapText(storyNode.name, TEXT_LINE_CHAR_LIMIT).secondLine}
                {choice && wrapText(choice.content, TEXT_LINE_CHAR_LIMIT).secondLine}
            </text>
        </g>
    )
}

export default Cell