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
}

export function getCssClassNames(propsCss, doc) {
    const styleSource = `
.${css.container} {
display: grid;
grid-template-columns: 40px auto;
align-items: center;
min-height: 40px;
border: 1px solid rgba(0, 0, 0, .3);
user-select: none;
border-radius: 8px;
}
.${css.actions} {
width: 40px;
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
color: rgba(255, 255, 255, 1);
margin: 2px 0;
display: flex;
align-items: center;
height: 20px;
}
.${css.resultItemValue} {
background-color: rgba(0, 0, 0, .5);
line-height: 20px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
}

.${css.resultItemRemove} {
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, .5);
    cursor: pointer;
}

`

    const style = doc.createElement('style')

    style.type = 'text/css'
    style.innerHTML = styleSource

    const head = doc.getElementsByTagName('head')[0]
    const headStyle = doc.getElementsByTagName('style')[0]
    head.insertBefore(style, headStyle)

    return {
        actions: mergeClassNames(css.actions, propsCss.actions),
        container: mergeClassNames(css.container, propsCss.container),
        resultsContainer: mergeClassNames(css.resultsContainer, propsCss.resultsContainer),
        searchContainer: mergeClassNames(css.searchContainer, propsCss.searchContainer),
        searchInput: mergeClassNames(css.searchInput, propsCss.searchInput),
        resultItem: mergeClassNames(css.resultItem, propsCss.resultItem),
        resultItemValue: mergeClassNames(css.resultItemValue, propsCss.resultItemValue),
        resultItemRemove: mergeClassNames(css.resultItemRemove, propsCss.resultItemRemove),
    }
}

export default { }
