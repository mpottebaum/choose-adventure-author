import React from 'react'

const Line = ({
    x1,
    x2,
    y1,
    y2,
    stroke,
    strokeWidth,
}) => (
    <line
        x1={x1}
        x2={x2}
        y1={y1}
        y2={y2}
        stroke={stroke}
        strokeWidth={strokeWidth}
    />
)

export default Line