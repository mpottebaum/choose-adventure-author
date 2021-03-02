import React from 'react'
import { wrapText } from '../../../helpers/svgHelpers'
import { useDispatch } from 'react-redux'
import { openModal } from '../../../store/modal/actions'
import { selectStoryNode, deselectStoryNode } from '../../../store/selStoryNodeId/actions'
import { setStoryNodeCoordinates, clearStoryNodeCoordinates } from '../../../store/newStoryNodeCoordinates/actions'
import { storyNodeModal, createStoryNodeModal } from '../../../constants/modals'

// TO DO:
// 1. wrapText: add code for first words longer than 17 chars

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
    const dispatch = useDispatch()

    const fillColor = () => {
        if(storyNode) return storyNode.color || 'gray'
        if(choice) return 'yellow'
        return 'white'
    }
    // if(storyNode) {
    //     console.log('gridY', gridY, 'gridX', gridX)
    //     console.log('node', storyNode)
    //     console.log(wrapText(storyNode.content, 17))
    // }
    // if(choice) {
    //     console.log('gridY', gridY, 'gridX', gridX)
    //     console.log('choice', choice)
    //     console.log(wrapText(choice.content, 17))
    // }

    const onCellClick = () => {
        if(storyNode) {
            dispatch(clearStoryNodeCoordinates())
            dispatch(selectStoryNode(storyNode.id))
            dispatch(openModal(storyNodeModal))
        } else if(choice) {
            dispatch(clearStoryNodeCoordinates())
            dispatch(selectStoryNode(choice.story_node_id))
            dispatch(openModal(storyNodeModal))
        } else {
            const coordinates = { x: gridX, y: gridY }
            dispatch(deselectStoryNode())
            dispatch(setStoryNodeCoordinates(coordinates))
            dispatch(openModal(createStoryNodeModal))
        }
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
                x={svgX + 5}
                y={svgY + 4 + textSize}
            >
                {storyNode && wrapText(storyNode.name, 17).firstLine}
                {choice && wrapText(choice.content, 17).firstLine}
            </text>
            <text
                fontSize={textSize}
                x={svgX + 5}
                y={svgY + 4 + (textSize * 2)}
            >
                {storyNode && wrapText(storyNode.name, 17).secondLine}
                {choice && wrapText(choice.content, 17).secondLine}
            </text>
        </g>
    )
}

export default Cell