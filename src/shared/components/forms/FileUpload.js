import React from "react";
import Radium from "radium";

const FileUpload = (props) => {
    return React.createElement("input", {
        type: "file",
        ...props,
    })
}
export default Radium(FileUpload);
