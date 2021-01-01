export function dispatchOnSearchEvent(sourceEvent, state, instance) {
    const event = new CustomEvent('search', {
        detail: {
            instance,
            sourceEvent,
            state,
            value: sourceEvent.target.value,
        },
    })

    instance.node.dispatchEvent(event)
}

export default { }
