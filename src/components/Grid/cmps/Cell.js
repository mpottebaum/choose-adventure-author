import React from 'react'
import { wrapText } from '../../../helpers/svgHelpers'

// TO DO:
// 1. wrapText: add code for first words longer than 17 chars

const Cell = ({
    rowNum,
    colNum,
    x,
    y,
    width,
    height,
    stroke,
    fill,
    strokeWidth,
    textSize,
    storyNode,
}) => {

    if(storyNode) {
        console.log('rowNum', rowNum, 'colNum', colNum)
        console.log('node', storyNode)
        console.log(wrapText(storyNode.content, 17))
    }
    
    
    return (
        <g>
            <rect
                id={`col${colNum}row${rowNum}`}
                x={x}
                y={y}
                width={width}
                height={height}
                stroke={stroke}
                fill={fill}
                strokeWidth={strokeWidth}
            />
            <text
                fontSize={textSize}
                x={x + 5}
                y={y + 4 + textSize}
            >
                {storyNode && wrapText(storyNode.content, 17).firstLine}
            </text>
            <text
                fontSize={textSize}
                x={x + 5}
                y={y + 4 + (textSize * 2)}
            >
                {storyNode && wrapText(storyNode.content, 17).secondLine}
            </text>
        </g>
    )
}

export default Cell