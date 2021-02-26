import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../store/modal/actions'
import { storyNodeModal } from '../constants/modals'

import ReactModal from 'react-modal'

import StoryNodeModal from '../components/modals/StoryNodeModal'

const customStyles = {
    content: {
        height: 'fit-content',
    },
}

const Modal = () => {
    const { modal } = useSelector(state => state)
    const dispatch = useDispatch()

    const onClose = () => dispatch(closeModal())

    const renderModal = () => {
        switch(modal) {
            case storyNodeModal:
                return (
                    <StoryNodeModal
                        onClose={onClose}
                    />
                )
            default:
                return null
        }
    }
    return (
        <ReactModal
            isOpen={!!modal}
            shouldCloseOnOverlayClick={true}
            onRequestClose={onClose}
            ariaHideApp={false}
            style={customStyles}
        >
            {renderModal()}
        </ReactModal>
    )
}

export default Modal