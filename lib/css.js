import { getClassName, mergeClassNames } from './utils'

export const css = {
    actions: getClassName('actions'),
    container: getClassName('container'),
    resultsContainer: getClassName('resultsContainer'),
    searchContainer: getClassName('searchContainer'),
    searchInput: getClassName('searchInput'),
    resultItem: getClassName('resultItem'),
    resultItemValue: getClassName('resultItemValue'),
    resultItemRemove: getClassName('resultItemRemove'),
    sourceList: getClassName('sourceList'),
    sourceItem: getClassName('sourceItem'),
    sourceItemSelected: getClassName('sourceItemSelected'),
}

const styleSource = `
    .${css.container} {
        display: grid;
        grid-template-columns: 40px auto;
        align-items: flex-start;
        min-height: 40px;
        border: 1px solid rgba(0, 0, 0, .2);
        user-select: none;
        position: relative;
    }

    .${css.actions} {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
    }

    .${css.resultsContainer} {
        display: flex;
        flex: 1 0 auto;
        min-height: 40px;
        align-items: center;
        font-size: 14px;
        flex-wrap: wrap;
    }

    .${css.searchContainer} {
        width: 4px;
        order: 2;
        margin-left: 2px;
    }

    .${css.searchInput} {
        opacity: 0;
        border: 0;
        outline: 0;
        padding: 0;
        margin: 0;
        width: 100%;
        font-size: 14px;
        line-height: 20px;
    }

    .${css.resultItem} {
        padding: 0 4px;
        color: rgba(0, 0, 0, 1);
        margin: 2px 0;
        display: flex;
        align-items: center;
        height: 20px;
    }

    .${css.resultItemValue} {
        background-color: rgba(0, 0, 0, .1);
        line-height: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .${css.resultItemRemove} {
        background-color: rgba(0, 0, 0, .1);
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .${css.sourceList} {
        align-items: stretch;
        border: 1px solid rgba(0, 0, 0, .2);
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        left: -1px;
        position: absolute;
        top: 45px;
        width: 100%;
    }

    .${css.sourceItem} {
        padding: 0 10px;
        line-height: 30px;
        display: flex;
    }

    .${css.sourceItem}:hover {
        background-color: rgba(0, 0, 0, .1);
    }

    .${css.sourceItemSelected},
    .${css.sourceItemSelected}:hover {
        background-color: rgba(0, 0, 0, .4);
        color: rgba(255, 255, 255, .8);
    }
`

export function renderCss(doc) {
    const style = doc.createElement('style')

    style.type = 'text/css'
    style.innerHTML = styleSource

    const head = doc.getElementsByTagName('head')[0]
    const headStyle = doc.getElementsByTagName('style')[0]
    head.insertBefore(style, headStyle)
}

export function getCssClassNames(propsCss) {
    return {
        actions: mergeClassNames(css.actions, propsCss.actions),
        container: mergeClassNames(css.container, propsCss.container),
        resultsContainer: mergeClassNames(css.resultsContainer, propsCss.resultsContainer),
        searchContainer: mergeClassNames(css.searchContainer, propsCss.searchContainer),
        searchInput: mergeClassNames(css.searchInput, propsCss.searchInput),
        resultItem: mergeClassNames(css.resultItem, propsCss.resultItem),
        resultItemValue: mergeClassNames(css.resultItemValue, propsCss.resultItemValue),
        resultItemRemove: mergeClassNames(css.resultItemRemove, propsCss.resultItemRemove),
        sourceList: mergeClassNames(css.sourceList, propsCss.sourceList),
        sourceItem: mergeClassNames(css.sourceItem, propsCss.sourceItem),
        sourceItemSelected: mergeClassNames(css.sourceItemSelected, propsCss.sourceItemSelected),
    }
}

export default { }
