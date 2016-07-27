import React from "react";
import Modal from "react-modal";

let overlayStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    backgroundColor: "rgba(0, 0, 0, .6)",
    display: "block",
}

export default class DimModal extends React.Component {

    static propTypes = {
        isOpen: React.PropTypes.bool,
        onAfterOpen: React.PropTypes.func,
        onRequestClose: React.PropTypes.func,
        closeTimeoutMS: React.PropTypes.number,
        style: React.PropTypes.object,
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                onAfterOpen={this.props.onAfterOpen}
                onRequestClose={this.props.onRequestClose}
                closeTimeoutMS={this.props.closeTimeoutMS}
                style={{ overlay: overlayStyle, content: this.props.style }}
            >
                {this.props.children}
            </Modal>
        )
    }
}
