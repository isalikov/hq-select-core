/**
<RootNode>
    <ActionsNode>
        <SearchSVG />
    </ActionsNode>

    <ResultsContainerNode>
        [<ValueItemNode>
            <ValueItemNodeText />String</ValueItemNodeText>
            <ValueItemNodeRemove>SVG</ValueItemNodeRemove>
        </ValueItemNode>]

        <SearchContainerNode>
            <SearchInputNode />
        </SearchContainerNode>
    </ResultsContainerNode>

    <SourceListNode>
        [<SourceItemNode>String</SourceItemNode>] || <SourceEmptyNode>
    </SourceListNode>
</RootNode>
*/

import { getCssClassNames, css as baseCss, renderCss } from './css'
import { applyClassNames, getStringWidth } from './utils'
import { dispatchOnDeleteEvent, dispatchOnSelectEvent } from './events'
import { getState } from './state'

import RemoveSVG from './svg/removeSVG'
import SearchSVG from './svg/searchSVG'

export const setSearchContainerWidth = (doc, event) => {
    const searchTextWidth = getStringWidth(event.target.value, doc) + 4
    const searchContainer = doc.querySelector(`.${baseCss.searchContainer}`)

    const { width: resultsContainerWidth } = doc.querySelector(
        `.${baseCss.resultsContainer}`,
    ).getBoundingClientRect()

    if (searchTextWidth < resultsContainerWidth) {
        searchContainer.style.width = `${searchTextWidth}px`
    } else {
        searchContainer.style.width = `${resultsContainerWidth - 10}px`
    }
}

export function RenderValuesList(
    doc,
    state,
    rootElement,
    propsCss,
) {
    const css = getCssClassNames(propsCss, doc)

    const { width: maxWidth } = doc.querySelector(`.${baseCss.resultsContainer}`)
        .getBoundingClientRect()

    const ResultsContainerNode = doc.querySelector(`.${baseCss.resultsContainer}`)

    Array.from(doc.querySelectorAll(`.${baseCss.resultItem}`))
        .forEach((Node) => Node.remove())

    Array.from(state.value)
        .reverse()
        .forEach(([key, text]) => {
            const ValueItemNode = doc.createElement('div')
            ValueItemNode.style.maxWidth = `${maxWidth - 20}px`
            applyClassNames(ValueItemNode, css.resultItem)

            const ValueItemNodeText = doc.createElement('span')
            ValueItemNodeText.innerText = text.toString()
            applyClassNames(ValueItemNodeText, css.resultItemValue)

            const ValueItemNodeRemove = doc.createElement('span')
            ValueItemNodeRemove.innerHTML = RemoveSVG
            applyClassNames(ValueItemNodeRemove, css.resultItemRemove)

            ValueItemNode.append(ValueItemNodeText)
            ValueItemNode.append(ValueItemNodeRemove)

            ValueItemNodeRemove.addEventListener('click', (event) => {
                event.stopPropagation()

                dispatchOnDeleteEvent(key, event, getState(), rootElement)
            })

            ResultsContainerNode.prepend(ValueItemNode)
        })
}

export function RenderSourceList(
    doc,
    state,
    rootElement,
    propsCss,
) {
    const css = getCssClassNames(propsCss, doc)
    const ExistSourceList = doc.querySelector(`.${baseCss.sourceList}`)

    const SourceListNode = doc.createElement('div')
    applyClassNames(SourceListNode, css.sourceList)

    if (state.source.size > 0) {
        Array.from(state.source)
            .forEach(([key, text]) => {
                const SourceItemNode = doc.createElement('span')
                SourceItemNode.innerText = text.toString()
                applyClassNames(SourceItemNode, css.sourceItem)

                if (state.value.has(key)) {
                    applyClassNames(SourceItemNode, css.sourceItemSelected)
                }

                SourceItemNode.addEventListener('click', (event) => {
                    event.stopPropagation()

                    dispatchOnSelectEvent(key, event, getState(), rootElement)
                })

                SourceListNode.append(SourceItemNode)
            })
    } else {
        const SourceEmptyNode = doc.createElement('span')
        SourceEmptyNode.innerText = state.sourceEmptyLabel
        applyClassNames(SourceEmptyNode, css.sourceEmpty)

        SourceListNode.append(SourceEmptyNode)
    }

    if (ExistSourceList) {
        ExistSourceList.replaceWith(SourceListNode)
    } else {
        rootElement.append(SourceListNode)
    }
}

export function InitialRender(
    doc,
    state,
    rootElement,
    propsCss,
) {
    const css = getCssClassNames(propsCss, doc)

    const RootNode = doc.createElement('div')
    applyClassNames(RootNode, css.container)

    const ActionsNode = doc.createElement('div')
    ActionsNode.innerHTML = SearchSVG
    applyClassNames(ActionsNode, css.actions)

    const ResultsContainerNode = doc.createElement('div')
    applyClassNames(ResultsContainerNode, css.resultsContainer)

    const SearchContainerNode = doc.createElement('div')
    applyClassNames(SearchContainerNode, css.searchContainer)

    const SearchInputNode = doc.createElement('input')
    SearchInputNode.setAttribute('autocomplete', 'off')
    SearchInputNode.setAttribute('type', 'text')
    applyClassNames(SearchInputNode, css.searchInput)

    SearchContainerNode.append(SearchInputNode)
    ResultsContainerNode.append(SearchContainerNode)
    RootNode.append(ActionsNode)
    RootNode.append(ResultsContainerNode)

    rootElement.replaceWith(RootNode)

    if (state.value.size > 0) {
        RenderValuesList(
            doc,
            state,
            RootNode,
            propsCss,
        )
    }

    if (state.open && !state.disabled) {
        RenderSourceList(
            doc,
            state,
            RootNode,
            propsCss,
        )
    }

    renderCss(doc)

    return RootNode
}

export default { }
