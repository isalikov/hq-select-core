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

const HqSelectCore = ((doc) => {
    function Component(element, props, propsCss) {
        const { getState, setState } = createState({
            debounce: 0,

            source: new Map([]),
            value: new Map([]),

            disabled: false,
            open: false,

            sourceEmptyLabel: ' ',
            placeholderLabel: ' ',

            ...props,

            /* private props */
            isFocused: false,
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
            setState({ isFocused: false })
            dispatchOnBlurEvent(event, getState(), node)
        }

        const handleResultsContainerClick = () => {
            const input = doc.querySelector(`.${css.searchInput}`)
            input.focus()
        }

        const handleSearchInputFocus = (event) => {
            const input = doc.querySelector(`.${css.searchInput}`)

            input.style.opacity = 1

            dispatchOnFocusEvent(event, getState(), node)

            setState({ isFocused: true })
        }

        doc.querySelector(`.${css.searchInput}`)
            .addEventListener('input', handleSearchInputChange)

        doc.querySelector(`.${css.searchInput}`)
            .addEventListener('blur', handleSearchInputBlur)

        doc.querySelector(`.${css.searchInput}`)
            .addEventListener('focus', handleSearchInputFocus)

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
        module.exports = HqSelectCore
    }
} catch (error) {
    window.HqSelectCore = HqSelectCore
}
