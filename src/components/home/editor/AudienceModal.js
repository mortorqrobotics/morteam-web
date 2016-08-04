import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import StandardModal from "~/components/shared/StandardModal";
import AudienceSelect from "~/components/shared/audience/AudienceSelect";
import styles from "~/styles/home/editor";

export default class AudienceModal extends React.Component {

    static propTypes = {
        isOpen: React.PropTypes.bool,
        onAfterOpen: React.PropTypes.func,
        onRequestClose: React.PropTypes.func,
        selected: React.PropTypes.object,
        onChange: React.PropTypes.func,
    }

    render() {
        return (
            <StandardModal
                title="Select Audience"
                isOpen={this.props.isOpen}
                onAfterOpen={this.props.onAfterOpen}
                onRequestClose={this.props.onRequestClose}
            >
                <AudienceSelect
                    selected={this.props.selected}
                    onChange={this.props.onChange}
                />
            </StandardModal>
        )
    }
}
