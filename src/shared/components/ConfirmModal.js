import React from "react";
import Radium from "radium";

import StandardModal from "~/shared/components/StandardModal";
import { ModalButton } from "~/shared/components/modal";
import { modalPropTypes, modalPropsForward } from "~/util/modal";

const ConfirmModal = Radium((props) => {
    return (
        <StandardModal
            title="Are you sure?"
            isOpen={props.isOpen}
            onAfterOpen={props.onAfterOpen}
            onRequestClose={props.onRequestClose}
    
        >
            {props.text}

            <ModalButton
                onClick={props.action}
                text="Confirm"
            />
            <ModalButton
                onClick={() => props.onRequestClose()}
                text="Cancel"
            />
        </StandardModal>
    )
})

ConfirmModal.propTypes = {
    text: React.PropTypes.string,
    action: React.PropTypes.func,
    ...modalPropTypes,
}
    
export default ConfirmModal;
