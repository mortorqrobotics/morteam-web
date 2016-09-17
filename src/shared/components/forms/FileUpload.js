import React from "react";

export default class FileUpload extends React.Component {

    render() {
        return (
            <input
                type="file"
                { ...this.props }
            />
        )
    }

}
