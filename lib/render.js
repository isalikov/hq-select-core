/**
<RootNode>
    <ActionsNode>
        <SearchSVG />
    </ActionsNode>

    <ResultsContainerNode>
        [<ItemNode>
            <ItemNodeText />String</ItemNodeText>
        </ItemNode>]

        <SearchContainerNode>
            <SearchInputNode />
        </SearchContainerNode>
    </ResultsContainerNode>
</RootNode>
*/

import { getCssClassNames, css as baseCss } from './css'
import { applyClassNames, getStringWidth } from './utils'
import { dispatchOnDelete } from './events/value'
import { getState } from './state'

import RemoveSVG from './elements/removeSVG'
import SearchSVG from './elements/searchSVG'

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
    rootCss,
) {
    const css = getCssClassNames(rootCss, doc)

    const { width: maxWidth } = doc.querySelector(`.${baseCss.resultsContainer}`)
        .getBoundingClientRect()

    const ResultsContainerNode = doc.querySelector(`.${baseCss.resultsContainer}`)

    const ValuesListNodes = Array.from(state.value)
        .map(([key, text]) => {
            const ItemNode = doc.createElement('div')
            ItemNode.style.maxWidth = `${maxWidth - 20}px`
            applyClassNames(ItemNode, css.resultItem)

            const ItemNodeText = doc.createElement('span')
            ItemNodeText.innerText = text.toString()
            applyClassNames(ItemNodeText, css.resultItemValue)

            const ItemNodeRemove = doc.createElement('span')
            ItemNodeRemove.innerHTML = RemoveSVG
            applyClassNames(ItemNodeRemove, css.resultItemRemove)

            ItemNode.append(ItemNodeText)
            ItemNode.append(ItemNodeRemove)

            ItemNodeRemove.addEventListener(
                'click',
                (e) => dispatchOnDelete(key, e, getState(), rootElement),
            )

            return ItemNode
        })

    ValuesListNodes.reverse().forEach(
        (ValueNode) => ResultsContainerNode.prepend(ValueNode),
    )
}

export function InitialRender(
    doc,
    state,
    rootElement,
    rootCss,
) {
    const css = getCssClassNames(rootCss, doc)

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

    RenderValuesList(
        doc,
        state,
        RootNode,
        rootCss,
    )

    return RootNode
}

export default { }
