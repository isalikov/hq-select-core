[![Build Status](https://travis-ci.org/isalikov/hq-select-core.svg?branch=main)](https://travis-ci.org/isalikov/hq-select-core)
[![npm version](https://badge.fury.io/js/hq-select-core.svg)](https://badge.fury.io/js/hq-select-core)


# [hq-select-core](https://isalikov.github.io/hq-select-core)

Light and highly customizable multi select picker

> [Demo](https://isalikov.github.io/hq-select-core)

![preview](https://github.com/isalikov/hq-select-core/blob/main/images/preview.gif?raw=true)

---

### Installation
Just add `hq-select-core@latest` script to your document
```html
<script src="https://unpkg.com/hq-select-core@latest/dist/hq-select-core.js"></script>
```

### Usage Example
```html
<script>
    const select = HqSelectCore(document.querySelector('div#hq-select-core'), {
        /* config props */
    })

    select.addEventListeners('open', () => { })
    select.addEventListeners('close', () => { })
    select.addEventListeners('search', () => { })
</script>
```

Or install as CommonJS module
- `npm install hq-select-core`
- `import HqCropper from 'hq-select-core'`
