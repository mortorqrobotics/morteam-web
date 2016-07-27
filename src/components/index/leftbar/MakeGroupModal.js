import React from "react";
import Radium from "radium";

import DimModal from "../../shared/DimModal";

let styles = {
    modal: {
        position: "fixed",
        display: "block",
        left: "50%",
        top: "50%",
        marginLeft: "-175px",
        marginTop: "-207px",
        borderRadius: "3px",
        fontFamily: "'exo 2', sans-serif",
        fontWeight: "200",
    },
    title: {
        padding: "10px 15px",
        backgroundColor: "#ffc547",
        color: "black",
    },
    content: {
        padding: "12px 15px",
        backgroundColor: "#E9E9E9",
    }
}

@Radium
export default class MakeGroupModal extends React.Component {

    static PropTypes = {
        isOpen: React.PropTypes.bool,
        onAfterOpen: React.PropTypes.func,
        onRequestClose: React.PropTypes.func
    }

    render() {
        return (
            <DimModal
                isOpen={this.props.isOpen}
                onAfterOpen={this.props.onAfterOpen}
                onRequestClose={this.props.onRequestClose}
                style={styles.modal}
            >
                <div style={styles.title}>New Group</div>
                <div style={styles.content}>
                    <p>test</p>
                </div>
            </DimModal>
        )
    }
}
