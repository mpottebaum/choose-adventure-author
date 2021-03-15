import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../store/modal/actions'
import modals from '../constants/modals'

import ReactModal from 'react-modal'

import StoryNodeModal from '../components/modals/StoryNodeModal'
import ChoiceModal from '../components/modals/ChoiceModal'

const { storyNodeModal, createStoryNodeModal, choiceModal } = modals

const customStyles = {
    content: {
        height: 'fit-content',
        width: 'fit-content',
        position: 'initial',
    },
    overlay: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '50pt',
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
            case createStoryNodeModal:
                return (
                    <StoryNodeModal
                        onClose={onClose}
                        createNode
                    />
                )
            case choiceModal:
                return (
                    <ChoiceModal
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