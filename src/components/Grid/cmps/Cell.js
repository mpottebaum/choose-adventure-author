import React from 'react'

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
                x={x}
                y={y + textSize}
            >
                {storyNode && storyNode.content}
            </text>
        </g>
    )
}

export default Cell