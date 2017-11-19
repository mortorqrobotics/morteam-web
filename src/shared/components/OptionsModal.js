import React from "react";
import Radium from "radium";

import StandardModal from "~/shared/components/StandardModal";
import { ModalTextBox, ModalButton } from "~/shared/components/modal";
import ProfilePicture from "~/shared/components/ProfilePicture";
import Button from "~/shared/components/forms/Button";
import ErrorMsg from "~/shared/components/forms/ErrorMsg";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import AudienceSelect from "~/shared/components/audience/AudienceSelect";
import { makeChangeHandlerFactory, fullName, currentUser } from "~/util";
import { modalPropTypes, modalPropsForward } from "~/util/modal";
import { getGroupName } from "~/util/groups";
import { connect } from "react-redux";
import styles from "~/shared/styles/optionsModal";

const UserListItem = Radium(props => {
    return (
        <li style={styles.li}>
            <ProfilePicture
                user={props.user}
                picSize="small"
                frameSize={30}
                hasIndicator
            />
            <span
                style={[styles.span, styles.memberSpan]}
                onClick={() => window.location.assign("/profiles/id/" + props.user._id)}
            >
                {fullName(props.user)}
            </span>
        </li>
    )
})

const GroupListItem = Radium(props => {
    return (
        <li style={styles.li}>
            <img
                style={styles.img}
                src="/images/group.png"
            />
            <span
                style={[styles.span, styles.memberSpan]}
                onClick={props.isMultiTeam
                    ? () => window.location.assign("/teams/number/" + prpos.group.team.number )
                    : () => window.location.assign("/groups/id/" + props.group._id)
                }
            >
                {props.isMultiTeam
                    ? getGroupName(props.group) + " of "  + props.group.team.number
                    : getGroupName(props.group)
                }
            </span>
        </li>
    )
})

@Radium
class OptionsModal extends React.Component {

    static propTypes = {
        ...modalPropTypes,
        obj: React.PropTypes.object,
        hasAudienceList: React.PropTypes.bool,
        hasDelete: React.PropTypes.bool,
        hasNameEdit: React.PropTypes.bool,
        hasAddAudience: React.PropTypes.bool,
        onDelete: React.PropTypes.func,
        onNameChange: React.PropTypes.func,
        onAddAudience: React.PropTypes.func,
    }

    getChangeHandler = makeChangeHandlerFactory(this);

    initialState = {
        name: this.props.obj.name,
        isDeleteConfirmOpen: false,
        errorMsg: "",
        isAddingAudience: false,
        audience: {
            users: [],
            groups: [],
        },
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

                    {this.props.hasAddAudience && (
                        <li
                            style={[styles.addMemberLi, styles.li]}
                            key="addMember"
                            onClick={() => this.setState({ isAddingAudience: true })}
                        >
                            <Glyphicon style={styles.plus} glyph="plus" />
                            <span
                                style={styles.span}
                            >
                                Add new members
                            </span>
                        </li>
                    )}

                    {this.props.obj.audience.groups.map(group  => (
                        <GroupListItem group={group} key={group._id}
                            isMultiTeam={this.props.obj.audience.isMultiTeam}
                        />
                    ))}
                    {this.props.obj.audience.users.map(user => (
                        <UserListItem user={user} key={user._id} />
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
        const isAddingAudience = this.state.isAddingAudience;
        let view = null;
        if (isAddingAudience && this.props.hasAddAudience) {
            view =
                <div>
                    <AudienceSelect
                        excludedUsers={this.props.obj.audience.users}
                        excludedGroups={this.props.obj.audience.groups}
                        selected={this.state.audience}
                        onChange={audience => this.setState({ audience })}
                        isMultiTeam={this.props.obj.isMultiTeam}
                    />
                    <ModalButton
                        text="Add"
                        style={styles.confirmAddButton}
                        onClick={() => {
                            this.setState(this.initialState);
                            this.props.onAddAudience(this.state.audience);
                        }}
                    />
                    <ModalButton
                        text="Cancel"
                        onClick={() => this.setState(this.initialState)}
                    />
                </div>
        } else {
            view =
                <div>
                    {this.handleNameEditRender()}
                    {this.handleAudienceRender()}
                    {this.handleDoneRender()}
                    {this.handleDeleteRender()}
                </div>
        }
        return (
            <StandardModal
                title="Options"
                { ...modalPropsForward(this) }
                onRequestClose={() => {
                    this.setState(this.initialState);
                    this.props.onRequestClose();
                }}
            >
            {view}
            </StandardModal>
        )
    }
}

export default connect()(OptionsModal);
