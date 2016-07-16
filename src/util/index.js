export function makeChangeHandlerFactory(ctx) {
    let handlerCache = {};
    return function(name) {
        if (handlerCache[name]) {
            return handlerCache[name];
        } else {
            handlerCache[name] = (event) => {
                let obj = {};
                obj[name] = event.target.value;
                this.setState(obj);
            }
            return handlerCache[name];
        }
    }.bind(ctx);
}
