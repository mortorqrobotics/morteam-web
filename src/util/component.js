import React from "react";

export const withCss = (Comp, style) => (
    withProps(Comp, { style: style })
)

export const withProps = (Comp, values) => (props) => (
    React.cloneElement(React.createElement(Comp, props), values)
)
