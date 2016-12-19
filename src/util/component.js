import React from "react";

import DOMPurify, { sanitize } from "dompurify";

export const withCss = (Comp, style) => (
    withProps(Comp, { style: style })
)

export const withProps = (Comp, values) => (props) => (
    React.cloneElement(React.createElement(Comp, props), values)
)

// https://github.com/cure53/DOMPurify/blob/master/demos/hooks-target-blank-demo.html#L31
DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    if ("target" in node) {
        node.setAttribute("target", "_blank");
    }
    if (!node.hasAttribute("target")
        && (node.hasAttribute("xlink:href") || node.hasAttribute("href"))
    ) {
        node.setAttribute("xlink:show", "new");
    }
});

export function allowOnlyTags(tags, str) {
    // const regex = /<(?!(a\s|\/))/;
    const regex = new RegExp(
        "<(?!(" + tags.map(tag => tag + "(\\s|>)").join("|") + "|\/))"
    );
    // sanitize does need to be here
    // so that js cannot be inside an anchor
    return sanitize(str.replace(regex, "&lt;"));
}
