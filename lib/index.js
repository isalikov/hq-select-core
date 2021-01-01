import {
    InitialRender,
    setSearchContainerWidth,
} from './render'

import {
    dispatchOnSearchEvent,
} from './events/input'

import createState from './state'
import { css } from './css'

const LightMultiSelect = ((doc) => {
    function Component(element, props, propsCss) {
        const { getState, setState } = createState({
            debounce: 0,
            disabled: false,
            isOpen: false,
            maxVisibleItems: Infinity,
            placeholder: '',

            source: new Map([]),
            value: new Map([]),

            ...props,

            /* private props */
        })

        /* initial render */
        const node = InitialRender(doc, getState(), element, propsCss)

        const instance = {
            node,

            getState,
            setState,
        }

        const handleSearchInputChange = (event) => {
            setSearchContainerWidth(doc, event)
            dispatchOnSearchEvent(event, getState(), instance)
        }

        const handleSearchInputBlur = (event) => {
            event.target.value = ''
            setSearchContainerWidth(doc, event)
        }

        const handleResultsContainerClick = () => {
            const input = doc.querySelector(`.${css.searchInput}`)

            input.style.opacity = 1
            input.focus()
        }

        doc.querySelector(`.${css.searchInput}`)
            .addEventListener('input', handleSearchInputChange)

        doc.querySelector(`.${css.searchInput}`)
            .addEventListener('blur', handleSearchInputBlur)

        doc.querySelector(`.${css.resultsContainer}`)
            .addEventListener('click', handleResultsContainerClick)

        return instance
    }

    return Component
})(document)

try {
    if (module) {
        module.exports = LightMultiSelect
    }
} catch (error) {
    window.LightMultiSelect = LightMultiSelect
}
