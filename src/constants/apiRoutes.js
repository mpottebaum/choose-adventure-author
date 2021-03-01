const BASE_URL = 'http://localhost:3000'

const storyNodesApi = '/story-nodes'

export const getStoryNodesApi = storyId => BASE_URL + storyNodesApi + `?story_id=${storyId}`

export const createStoryNodeApi = BASE_URL + storyNodesApi