export function GETParamsAsObject() {
    let searchString = window.location.search.slice(1)
    if (searchString === '') {
        return {}
    }
    return Object.fromEntries(searchString.split('&').map(item => item.split('=')))
}
