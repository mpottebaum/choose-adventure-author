export const extractChoices = storyNodes => (
    storyNodes.reduce(
            (choicesArray, node) => [ ...choicesArray, ...node.choices ],
            []
        )
)