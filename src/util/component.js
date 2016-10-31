import React from "react";

import { sanitize } from "dompurify";

export const withCss = (Comp, style) => (
    withProps(Comp, { style: style })
)

export const withProps = (Comp, values) => (props) => (
    React.cloneElement(React.createElement(Comp, props), values)
)

export function allowOnlyTags(tags, str) {
    // const regex = /<(?!(a\s|\/))/;
    const regex = new RegExp(
        "<(?!(" + tags.map(tag => tag + "(\\s|>)").join("|") + "|\/))"
    );
    // sanitize does need to be here
    // so that js cannot be inside an anchor
    return sanitize(str.replace(regex, "&lt;"));
}
