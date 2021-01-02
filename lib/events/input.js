let timeout

export function dispatchOnSearchEvent(sourceEvent, state, instance) {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
        instance.node.dispatchEvent(new CustomEvent('search', {
            detail: {
                instance,
                sourceEvent,
                state,
                value: sourceEvent.target.value,
            },
        }))
    }, state.debounce)
}

export default { }
