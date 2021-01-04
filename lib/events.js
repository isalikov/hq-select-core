let debounceTimeout

export function dispatchOnDeleteEvent(key, sourceEvent, state, node) {
    const event = new CustomEvent('delete', {
        detail: {
            sourceEvent,
            state,
            value: key,
        },
    })

    node.dispatchEvent(event)
}

export function dispatchOnSelectEvent(key, sourceEvent, state, node) {
    const event = new CustomEvent('select', {
        detail: {
            sourceEvent,
            state,
            value: key,
        },
    })

    node.dispatchEvent(event)
}

export function dispatchOnFocusEvent(sourceEvent, state, node) {
    const event = new CustomEvent('focus', {
        detail: {
            sourceEvent,
            state,
            value: null,
        },
    })

    node.dispatchEvent(event)
}

export function dispatchOnBlurEvent(sourceEvent, state, node) {
    const event = new CustomEvent('blur', {
        detail: {
            sourceEvent,
            state,
            value: null,
        },
    })

    node.dispatchEvent(event)
}

export function dispatchOnSearchEvent(sourceEvent, state, node) {
    clearTimeout(debounceTimeout)

    debounceTimeout = setTimeout(() => {
        node.dispatchEvent(new CustomEvent('search', {
            detail: {
                sourceEvent,
                state,
                value: sourceEvent.target.value,
            },
        }))
    }, state.debounce)
}

export default { }
