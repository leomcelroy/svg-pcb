export function pathMatchesSelector(event, selector) {
    let path = event.path || (event.composedPath && event.composedPath());

    if (path) {
        for (let i = 0; i < path.length; i++) {
            if (path[i].matches && path[i].matches(selector)) {
                return true;
            }
        }
    }
    return false;
}