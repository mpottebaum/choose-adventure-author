import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../store/modal/actions'
import modals from '../constants/modals'
import { colors } from '../constants/theme'

import ReactModal from 'react-modal'

import StoryNodeModal from '../components/modals/StoryNodeModal'
import ChoiceModal from '../components/modals/ChoiceModal'
import Button from '../components/Button'

const { storyNodeModal, createStoryNodeModal, choiceModal } = modals

const customStyles = {
    content: {
        height: 'fit-content',
        width: 'fit-content',
        position: 'initial',
        padding: '0px',
        marginRight: '40px',
        marginLeft: '40px',
        maxWidth: '860px',
    },
    overlay: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '50pt',
    },
}

const Content = styled.div`
    padding: 0px 20px 20px 20px;
`

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
            <Button
                onClick={onClose}
                backgroundColor={colors.white}
                fontColor={colors.black}
            >x</Button>
            <Content>
                {renderModal()}
            </Content>
        </ReactModal>
    )
}

export default Modal