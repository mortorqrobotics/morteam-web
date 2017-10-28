import React from "react";
import Radium from "radium";

import StandardModal from "~/shared/components/StandardModal";
import { ModalTextBox, ModalButton } from "~/shared/components/modal";
import ProfilePicture from "~/shared/components/ProfilePicture";
import Button from "~/shared/components/forms/Button";
import ErrorMsg from "~/shared/components/forms/ErrorMsg";
import { makeChangeHandlerFactory, fullName, currentUser } from "~/util";
import { modalPropTypes, modalPropsForward } from "~/util/modal";
import { getGroupName } from "~/util/groups";
import { connect } from "react-redux";
import styles from "~/shared/styles/optionsModal";

@Radium
class OptionsModal extends React.Component {

    static propTypes = {
        ...modalPropTypes,
        obj: React.PropTypes.object,
        hasAudienceList: React.PropTypes.bool,
        hasDelete: React.PropTypes.bool,
        hasNameEdit: React.PropTypes.bool,
        onDelete: React.PropTypes.func,
        onNameChange: React.PropTypes.func,
    }

    getChangeHandler = makeChangeHandlerFactory(this);

    initialState = {
        name: this.props.obj.name,
        isDeleteConfirmOpen: false,
        errorMsg: "",
    }

    state = {
        ...this.initialState,
    }

    handleSubmit = () => {
        if (this.state.name.length < 20) {
            this.setState({
                errorMsg: this.initialState.errorMsg
            });
            this.props.onNameChange(this.state.name);
            this.props.onRequestClose();
        } else {
            this.setState({
                errorMsg: "Name has to be 19 characters or fewer",
            });
        }
    }

    handleNameEditRender = () => {
        if (this.props.hasNameEdit) {
            return (
                <div>
                    <ModalTextBox
                        value={this.state.name}
                        onChange={this.getChangeHandler("name") }
                    />
                    <ErrorMsg message={this.state.errorMsg} />
                </div>
            )
        }
    }

    handleAudienceRender = () => {
        if (this.props.hasAudienceList) {
            return (
                <ul style={styles.ul}>
                    {this.props.obj.audience.groups.map(group => (
                        <li key={"li" + this.props.obj._id + group._id ?  group._id : group}
                            style={styles.li}>
                            <img
                                style={styles.img}
                                src="/images/group.png"
                            />
                            <span
                                key={"span" + this.props.obj._id + group._id ?  group._id : group}
                                style={styles.span}
                                onClick={this.props.obj.audience.isMultiTeam
                                    ? () => window.location.assign("/teams/number/" + group.team.number )
                                    : () => window.location.assign("/groups/id/" + group._id)
                                }
                            >
                                {this.props.obj.audience.isMultiTeam
                                    ? getGroupName(group) + " of "  + group.team.number
                                    : getGroupName(group)
                                }
                            </span>
                        </li>
                    ))}
                    {this.props.obj.audience.users.map(user => (
                        <li key={"li" + this.props.obj._id + user._id ?  user._id : user}
                            style={styles.li}>
                            <ProfilePicture
                                user={user}
                                picSize="small"
                                frameSize={30}
                                hasIndicator
                            />
                            <span
                                key={"span" + this.props.obj._id + user._id ? user._id : user}
                                style={styles.span}
                                onClick={() => window.location.assign("/profiles/id/" + user._id)}
                            >
                                {fullName(user)}
                            </span>
                        </li>
                    ))}
                </ul>
            )
        }
    }

    handleDoneRender = () => {
        if (this.props.hasNameEdit) {
            return (
                <ModalButton
                    text="Done"
                    onClick={this.handleSubmit}
                />
            )
        }
    }

    handleDeleteRender = () => {
        if (this.props.hasDelete) {
            if (!this.state.isDeleteConfirmOpen) {
               return (
                    <Button
                        style={styles.deleteButton}
                        value="Delete"
                        onClick={() => this.setState({isDeleteConfirmOpen: true,})}
                    />
                )
            } else {
                return (
                    <div>
                        <p style={styles.p}>Are you sure?</p>
                        <Button
                            style={styles.confirmButton}
                            value="Yes"
                            onClick={this.props.onDelete}
                        />
                        <Button
                            style={styles.confirmButton}
                            value="No"
                            onClick={() => this.setState({isDeleteConfirmOpen: false,})}
                        />
                    </div>
                )
            }
        }
    }

    render() {
        return(
            <StandardModal
                title="Options"
                { ...modalPropsForward(this) }
                onRequestClose={() => {
                    this.setState(this.initialState);
                    this.props.onRequestClose();
                }}
            >
                {this.handleNameEditRender()}
                {this.handleAudienceRender()}
                {this.handleDoneRender()}
                {this.handleDeleteRender()}
            </StandardModal>
        )
    }
}

export default connect()(OptionsModal);
