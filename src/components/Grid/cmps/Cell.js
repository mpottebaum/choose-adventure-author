import React from 'react'
import { wrapText } from '../../../helpers/svgHelpers'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../../store/modal/actions'
import { moveStoryNode } from '../../../store/storyNodes/actions'
import { selectStoryNode, deselectStoryNode } from '../../../store/selStoryNodeId/actions'
import { setStoryNodeCoordinates, clearStoryNodeCoordinates } from '../../../store/newStoryNodeCoordinates/actions'
import modals from '../../../constants/modals'
import toolbarActions from '../../../constants/toolbarActions'

// TO DO:
// 1. wrapText: add code for first words longer than 17 chars

const TEXT_OFFSET_X = 5
const TEXT_OFFSET_Y = 4
const TEXT_LINE_CHAR_LIMIT = 17

const { move: moveAction } = toolbarActions
const { storyNodeModal, createStoryNodeModal } = modals

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
    const { selStoryNodeId, toolbarAction } = useSelector(state => state)
    const dispatch = useDispatch()

    const fillColor = () => {
        if(storyNode) return storyNode.color || 'gray'
        if(choice) return 'yellow'
        return 'white'
    }

    const onCellClick = () => {

        if(selStoryNodeId && toolbarAction) {
            switch(toolbarAction) {
                case moveAction:
                    if(!storyNode && !choice) {
                        dispatch(moveStoryNode(gridX, gridY, selStoryNodeId))
                    }
                    return
                default:
                    return
            }
        }

        if(storyNode) {
            // select story node
            // (open modal action is in SelectedCellLayer)
            dispatch(clearStoryNodeCoordinates())
            dispatch(selectStoryNode(storyNode.id))
            return
        }
        if(choice) {
            if(choice.story_node_id === selStoryNodeId) {
                // if choice's story node is selected
                // open story node modal
                dispatch(openModal(storyNodeModal))
                return
            }

            // otherwise, select story node
            dispatch(clearStoryNodeCoordinates())
            dispatch(selectStoryNode(choice.story_node_id))
            return
        }
        // for empty cells, open create story node modal
        const coordinates = { x: gridX, y: gridY }
        dispatch(deselectStoryNode())
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