import React from "react";
import Radium from "radium";

const Link = (props) => {
    let { location, text, ...rest } = props;
    return React.createElement("a", {
        href: location,
        children: text,
        ...rest,
    })
}
export default Radium(Link);
