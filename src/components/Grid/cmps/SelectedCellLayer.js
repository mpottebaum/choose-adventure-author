import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { openModal } from '../../../store/modal/actions'
import modals from '../../../constants/modals'
import { extractChoices } from '../../../helpers/storeHelpers'

const { storyNodeModal, choiceModal } = modals

const SelectedCellLayer = ({
    cellWidth,
    cellHeight,
    rows,
    columns,
}) => {

    const { selStoryNodeId, storyNodes, newStoryNodeCoordinates, selChoiceId } = useSelector(state => state)
    const choices = extractChoices(storyNodes)

    const storyNode = storyNodes.find(node => node.id === selStoryNodeId)
    const choice = choices.find(choice => choice.id === selChoiceId)

    const dispatch = useDispatch()

    const selectedCell = storyNode || newStoryNodeCoordinates || choice

    const coordinateToSVG = ( gridCoordinate, svgGridList, svgDimension ) => {
        const svgGridItem = svgGridList.find(svgGridItem => svgGridItem.coordinateNum === gridCoordinate)
        return svgGridItem.svgNum * svgDimension
    }

    const onClick = () => {
        if(storyNode) {
            dispatch(openModal(storyNodeModal))
            return
        }
        if(choice) {
            dispatch(openModal(choiceModal))
            return
        }
    }

    return (
        <g>
            {
                selectedCell && (
                    <rect
                        onClick={onClick}
                        id='selected-cell'
                        x={coordinateToSVG(selectedCell.x, columns, cellWidth)}
                        y={coordinateToSVG(selectedCell.y, rows, cellHeight)}
                        width={cellWidth}
                        height={cellHeight}
                        stroke='green'
                        fill='white'
                        fillOpacity={0}
                        strokeWidth={3}
                    />
                )
            }
        </g>
    )
}

export default SelectedCellLayer