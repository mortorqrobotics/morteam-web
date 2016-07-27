import React from "react";
import Modal from "react-modal";

export default class ModalWrapper extends React.Component {

    static propTypes = {
        isOpen: React.PropTypes.bool,
        onAfterOpen: React.PropTypes.func,
        onRequestClose: React.PropTypes.func,
        closeTimeoutMS: React.PropTypes.number,
        style: React.PropTypes.object
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                onAfterOpen={this.props.onAfterOpen}
                onRequestClose={this.props.onRequestClose}
                closeTimeoutMS={this.props.closeTimeoutMS}
                style={this.props.style}
            >
                {this.props.children}
            </Modal>
        )
    }
}
