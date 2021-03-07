const BASE_URL = 'http://localhost:3000'

const storyNodesApi = '/story-nodes'
const choicesApi = '/choices'

export const getStoryNodesApi = storyId => BASE_URL + storyNodesApi + `?story_id=${storyId}`

export const createStoryNodeApi = BASE_URL + storyNodesApi

export const updateStoryNodeApi = id => BASE_URL + storyNodesApi +  `/${id}`

export const deleteStoryNodeApi = id => BASE_URL + storyNodesApi +  `/${id}`

export const moveStoryNodeApi = id => BASE_URL + storyNodesApi +  `/${id}/move`

export const updateChoiceApi = id => BASE_URL + choicesApi + `/${id}`

export const deleteChoiceApi = id => BASE_URL + choicesApi + `/${id}`