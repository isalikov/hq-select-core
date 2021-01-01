export function dispatchOnDelete(key, sourceEvent, state, node) {
    const event = new CustomEvent('delete', {
        detail: {
            sourceEvent,
            state,
            value: key,
        },
    })

    node.dispatchEvent(event)
}

export default { }
