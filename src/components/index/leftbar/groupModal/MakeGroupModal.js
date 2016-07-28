import React from "react";
import Radium from "radium";

import DimModal from "~/components/shared/DimModal";
import CreateGroupButton from "./CreateGroupButton";
import ModalTextBox from "./ModalTextBox";
import GroupTypeOption from "./GroupTypeOption";
import ajax from "~/util/ajax";
import { makeChangeHandlerFactory, REDIR_TIME } from "~/util";

let styles = {
    modal: {
        position: "fixed",
        display: "block",
        left: "50%",
        top: "50%",
        right: "auto",
        bottom: "auto",
        marginLeft: "-175px",
        marginTop: "-207px",
        borderRadius: "3px",
        fontFamily: "'exo 2', sans-serif",
        fontWeight: "200",
        boxShadow: "0 3px 15px rgba(0, 0, 0, .4), 0 0 5px rgba(0, 0, 0, .4)",
        background: "#E9E9E9",
        padding: "0px",
        border: "none",
    },
    title: {
        padding: "10px 15px",
        backgroundColor: "#ffc547",
        color: "black",
    },
    content: {
        padding: "12px 15px",
        width: "350px",
        height: "373px",
        color: "#333",
    }
}

@Radium
export default class MakeGroupModal extends React.Component {

    constructor(props) {
        super(props);

        this.getChangeHandler = makeChangeHandlerFactory(this);

        this.state = {
            groupName: "",
            searchName: "",
            members: [window.__userInfo._id], //TODO: add the ability to add other members
            isPublic: true,
        }
    }

    static propTypes = {
        isOpen: React.PropTypes.bool,
        onAfterOpen: React.PropTypes.func,
        onRequestClose: React.PropTypes.func
    }

    //TODO: update state of leftbar to add new groups to leftbar
    createGroup = async() => {
        try {
            let { data } = await ajax.request("post", "/groups", {
                users: this.state.members,
                name: this.state.groupName,
                isPublic: this.state.isPublic
            });
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    selectTypePublic = () => {
        this.setState({
            isPublic: true
        });
    }

    selectTypePrivate = () => {
        this.setState({
            isPublic: false
        });
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

                    <ModalTextBox
                        placeholder="Group Name"
                        onChange={this.getChangeHandler("groupName")}
                        value={this.state.groupName}
                    />
                    <br />

                    <GroupTypeOption
                        text="Public"
                        onClick={this.selectTypePublic}
                        isSelected={this.state.isPublic}
                    />
                    <GroupTypeOption
                        text="Private"
                        onClick={this.selectTypePrivate}
                        isSelected={!this.state.isPublic}
                    />
                    <br />

                    <p>Please select some inital members</p> //TODO: actually do this
                    <ModalTextBox
                        placeholder="Search Names..."
                        onChange={this.getChangeHandler("searchName")}
                        value={this.state.searchName}
                    />
                    <br />

                    <CreateGroupButton onClick={this.createGroup} />

                </div>
            </DimModal>
        )
    }
}
