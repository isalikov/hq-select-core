import createState, { subscribe } from './state'
import { css } from './css'

import {
    dispatchOnSearchEvent,
    dispatchOnFocusEvent,
    dispatchOnBlurEvent,
} from './events'

import {
    InitialRender,
    RenderValuesList,
    RenderSourceList,
    setSearchContainerWidth,
} from './render'

const LightMultiSelect = ((doc) => {
    function Component(element, props, propsCss) {
        const { getState, setState } = createState({
            debounce: 0,
            disabled: false,
            placeholder: '',

            source: new Map([]),
            value: new Map([]),

            ...props,
        })

        const node = InitialRender(
            doc,
            getState(),
            element,
            propsCss,
        )

        const instance = {
            node,

            getState,
            setState,
        }

        const handleSearchInputChange = (event) => {
            setSearchContainerWidth(doc, event)
            dispatchOnSearchEvent(event, getState(), node)
        }

        const handleSearchInputBlur = (event) => {
            event.target.value = ''
            setSearchContainerWidth(doc, event)
            dispatchOnBlurEvent(event, getState(), node)
        }

        const handleResultsContainerClick = (event) => {
            const input = doc.querySelector(`.${css.searchInput}`)

            input.style.opacity = 1
            input.focus()

            dispatchOnFocusEvent(event, getState(), node)
        }

        doc.querySelector(`.${css.searchInput}`)
            .addEventListener('input', handleSearchInputChange)

        doc.querySelector(`.${css.searchInput}`)
            .addEventListener('blur', handleSearchInputBlur)

        doc.querySelector(`.${css.resultsContainer}`)
            .addEventListener('click', handleResultsContainerClick)

        subscribe('value', () => {
            RenderValuesList(
                doc,
                getState(),
                node,
                propsCss,
            )

            RenderSourceList(
                doc,
                getState(),
                node,
                propsCss,
            )
        })

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
