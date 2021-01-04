export const applyClassNames = (node, classNamesString = '') => {
    const source = classNamesString.split(' ')

    source.forEach((className) => {
        if (className && typeof className === 'string' && className.length > 0) {
            node.classList.add(className)
        }
    })
}

export const getClassName = (key) => `${key}__${Math.random()
    .toString(36)
    .substring(2)}_${Math.random()
    .toString(36)
    .substring(2)}`

export const mergeClassNames = (...classNames) => {
    const source = classNames.filter(
        (className) => className
            && typeof className === 'string',
    )

    return source.join(' ')
}

export const getStringWidth = (str, doc) => {
    const tmp = doc.createElement('span')
    tmp.style.opacity = 0
    tmp.style.position = 'absolute'
    tmp.style.top = '-9999px'
    tmp.style.left = '-9999px'

    tmp.innerHTML = str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')

    doc.body.appendChild(tmp)
    const { width } = tmp.getBoundingClientRect()
    doc.body.removeChild(tmp)

    return width
}

export default { }
