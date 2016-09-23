import React from "react";
import Radium from "radium";

import {
    ModalTextBox,
    ModalButton,
} from "~/shared/components/modal";
import ajax from "~/util/ajax";
import { fullName } from "~/util";
import update from "react/lib/update";
//import { ContextMenu, MenuItem, ContextMenuLayer } from "react-contextmenu";

@Radium
export default class TakeAttendance extends React.Component {

    static propTypes = {
        event: React.PropTypes.object,
        onDone: React.PropTypes.func,
    }

    constructor(props) {
        super(props);

        this.state = {
            query: "",
            attendance: [],
        }
    }
    
    componentDidMount = async () => {
        const { data } = await ajax.request("GET", `/events/id/${this.props.event._id}/attendance`);
        this.setState({ attendance: data });
        $("#attendance-search-box-" + this.props.event._id).focus();
    }

    getColor = (status) => {
        switch (status) {
            case "absent":
                return { backgroundColor: "orange" }
            case "present":
                return { backgroundColor: "#53cf29" }
            case "tardy":
                return { backgroundColor: "#fff500" }
            case "excused":
                return { backgroundColor: "#c5ff38" }
        }
    }

    handleLeftClick = (attendeeId) => {
        const index = this.state.attendance.findIndex(({ _id }) => _id == attendeeId);
        const attendee = this.state.attendance[index];
        const newStatus = attendee.status == "absent" ? "present" : "absent";
        this.setState({
            attendance: update(this.state.attendance, {
                [index]: {
                    status: {
                        $set: newStatus,
                    },
                },
            }),
        });
    }

    saveAttendance = async () => {
        // TODO: make this redux!
        await ajax.request("PUT", `/events/id/${this.props.event._id}/attendance`, {
            attendance: this.state.attendance,
        });
        this.props.onDone();
    }

    getSearched = () => {
        return this.state.attendance.filter(({ user }) => (
            fullName(user).toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1
        ))
    }
    
    markAllPresent = () => {
        this.setState({
            attendance: this.state.attendance.map(({ user, _id, status }) => {
                if (status === "absent") {
                    return { user, _id, status: "present" };
                } else {
                    return { user, _id, status };
                }
            }),
        });
    }

    render() {
        // TODO: refactor AudienceSelect a lot so this code does not have to be duplicated
        // split up its functionality
        return (
            <div>

                <ModalTextBox
                    id={"attendance-search-box-" + this.props.event._id} // make sure it is unique
                    placeholder="Search Names..."
                    onChange={event => this.setState({ query: event.target.value })}
                    value={this.state.query}
                />

                <a style={{cursor:"pointer"}} onClick={this.markAllPresent}>
                    Mark all as Present
                </a>

                <div style={{height:"130px",overflowY:"auto",}}>
                    {this.getSearched().map(({ user, status, _id }) => {
//                        const ContextMenuDiv = ContextMenuLayer(_id)("div");
                        return (
//                            <ContextMenuDiv identifier={"node-" + this.props.event._id}>
                                <p
                                    style={{
                                        margin: "2px 2px 4px 4px",
                                        display: "inline-block",
                                        padding: "2px 3px 2px 3px",
                                        boxShadow: "1.5px 2px 8px -2px #a9a9a9",
                                        borderRadius: "1px",
                                        cursor: "pointer",
                                        ...this.getColor(status),
                                    }}
                                    key={_id}
                                    onClick={() => this.handleLeftClick(_id)}
                                >
                                    {fullName(user)}
                                </p>
                                /*<ContextMenu identifier={_id} currentItem="b" style={{display:"inline"}}>
                                    {["present", "tardy", "excused"].map(status => (
                                        <MenuItem
                                            data={{ status }}
                                            onClick={(e, a)=>console.log(a)} style={{color:"red"}}
                                        >
                                            <div key={status+_id} style={{
                                                padding: "5px 10px 5px 10px",
                                                fontSize: "14px",
                                                width: "180px",
                                                backgroundColor: "#f9f9f9",
                                                ":hover": {
                                                textDecoration: "none",
                                                    backgroundColor: "#d9d9d9",
                                                },
                                                color: "#333",
                                                fontFamily: "'exo 2', sans serif",
                                                fontWeight: "200",
                                            }}>
                                                Mark as {status[0].toUpperCase() + status.slice(1)}
                                            </div>
                                        </MenuItem>
                                    ))}
                                </ContextMenu>
                            </ContextMenuDiv>*/
                        )
                    })}
                </div>

                <ModalButton
                    text="Save"
                    onClick={this.saveAttendance}
                />

            </div>
        )
    }

}

