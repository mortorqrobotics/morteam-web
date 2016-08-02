import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import AnnouncementsListItem from "./AnnouncementsListItem";
import { connect } from "react-redux";

let styles = {
    announcementsList: {
        maxWidth: "700px",
        margin: "auto",
        width: "90%",
    }
}

@Radium
class AnnouncementsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            announcements: []
        };
    }

    componentDidMount = async() => {
//        try {
//            let { data } = await ajax.request("get", "/announcements");
//            this.setState({
//                announcements: data
//            });
//        } catch (err) {
//            console.log(err);
//        }
    }

    render() {
        return (
            <div style={styles.announcementsList}>
                {this.props.announcements.map(listItem => (
                    <AnnouncementsListItem 
                        key={listItem._id}
                        author={listItem.author}
                        content={listItem.content}
                        audience={listItem.audience}
                        timestamp={new Date(listItem.timestamp)}
                    />
                ))}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        announcements: state.announcements
    }
}

export default connect(mapStateToProps)(AnnouncementsList);

