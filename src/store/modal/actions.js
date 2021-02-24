import {
    OPEN_MODAL,
    CLOSE_MODAL
} from './index'

export const openModal = modal => ({
    type: OPEN_MODAL,
    modal,
})

export const closeModal = () => ({
    type: CLOSE_MODAL,
})