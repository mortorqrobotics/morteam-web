export function makeChangeHandlerFactory(ctx) {
    let handlerCache = {};
    return function(name, propName) {
        if (handlerCache[name]) {
            return handlerCache[name];
        } else {
            handlerCache[name] = (event) => {
                let obj = {};
                obj[name] = event.target[propName || "value"];
                this.setState(obj);
            }
            return handlerCache[name];
        }
    }.bind(ctx);
}

export const REDIR_TIME = 700;
