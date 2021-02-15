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
    text,
}) => (
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
            {text}
        </text>
    </g>
)

export default Cell