import React from "react";

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

export const modalPropTypes = {
    isOpen: React.PropTypes.bool,
    onAfterOpen: React.PropTypes.func,
    onRequestClose: React.PropTypes.func,
}

export const range = (a, b) => {
    const arr = [];
    while (a < b) arr.push(a++);
    return arr;
}

// month is 0 indexed
export const daysInMonth = (year, month) => (
    new Date(year, month + 1, 0).getDate()
)
