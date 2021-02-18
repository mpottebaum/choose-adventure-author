import React from 'react'

import Row from './Row'

const RowsLayer = ({
    cellWidth,
    cellHeight,
    rows,
    columns,
    storyNodes,
    choices,
}) => {
    const renderRows = () => {
        return rows.map(( row ) => {
            const rowNodes = storyNodes.filter(node => node.grid_y === row.coordinateNum)
            const rowChoices = choices.filter(choice => choice.grid_y === row.coordinateNum)
            return (
                <Row
                    key={row.rowNum}
                    cellWidth={cellWidth}
                    cellHeight={cellHeight}
                    row={row}
                    columns={columns}
                    rowNodes={rowNodes}
                    rowChoices={rowChoices}
                />
            )
        })
    }

    return (
        <g>
            {renderRows()}
        </g>
    )
}

export default RowsLayer