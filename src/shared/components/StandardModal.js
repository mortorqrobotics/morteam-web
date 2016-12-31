import React from "react";

import styles from "~/shared/styles/standardModal";
import DimModal from "./DimModal";

const StandardModal = (props) => {
    return (
        <DimModal
            { ...props }
            style={styles.modal}
        >
            <div style={styles.title}>
                {props.title}
            </div>
            <div style={styles.content}>
                {props.children}
            </div>
        </DimModal>
    )
}

StandardModal.propTypes = {
    title: React.PropTypes.string,
    isOpen: React.PropTypes.bool,
    onAfterOpen: React.PropTypes.func,
    onRequestClose: React.PropTypes.func,
}

export default StandardModal;
