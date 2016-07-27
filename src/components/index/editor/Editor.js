import React from "react";
import Radium from "radium";
import ReactQuill from "react-quill";

// NO RADIUM!!! something about the react quill thing, it has its own css
export default class Editor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            content: "",
        }
    }

    render() {
        return (
            <div>
                <ReactQuill
                    style={{ width: "1000px", height: "200px", }}
                    theme="snow"
                    value={this.state.content}
                    onChange={(value) => this.setState({ content: value })}
                />
                <input type="button" value="Hello" />
            </div>
        )
    }

}
