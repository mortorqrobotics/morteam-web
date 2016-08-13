import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import StandardModal from "~/shared/components/StandardModal";
import AudienceSelect from "~/shared/components/audience/AudienceSelect";
import { modalPropTypes, modalPropsForward } from "~/util/modal";
import styles from "~/home/styles/editor";

export default class AudienceModal extends React.Component {

    static propTypes = {
        selected: React.PropTypes.object,
        onChange: React.PropTypes.func,
        ...modalPropTypes,
    }

    render() {
        return (
            <StandardModal
                title="Select Audience"
                { ...modalPropsForward(this) }
            >
                <AudienceSelect
                    selected={this.props.selected}
                    onChange={this.props.onChange}
                />
            </StandardModal>
        )
    }
}
