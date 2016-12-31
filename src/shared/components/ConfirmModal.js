import React from "react";
import Radium from "radium";

import StandardModal from "~/shared/components/StandardModal";
import { ModalButton } from "~/shared/components/modal";
import { modalPropTypes, modalPropsForward } from "~/util/modal";
import styles from "~/shared/styles/confirmModal";

const ConfirmModal = Radium((props) => {
    return (
        <StandardModal
            title="Are you sure?"
            { ...props }
        >
            {props.text}

            <ModalButton
                onClick={() => {
                    props.action();
                    props.onRequestClose();
                }}
                text="Confirm"
                style={props.grayConfirm && styles.grayConfirm}
            />
            <ModalButton
                onClick={() => props.onRequestClose()}
                text="Cancel"
                style={styles.cancel}
            />
        </StandardModal>
    )
})

ConfirmModal.propTypes = {
    text: React.PropTypes.string,
    action: React.PropTypes.func,
    grayConfirm: React.PropTypes.bool,
    ...modalPropTypes,
}

export default ConfirmModal;

