import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";
import AnnouncementsListItem from "./AnnouncementsListItem";

let styles = {
    announcementsList: {
        maxWidth: "700px",
        margin: "auto",
        width: "90%",
    }
}

@Radium
export default class AnnouncementsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            announcements: []
        };
    }

    componentDidMount = async() => {
        try {
            let announcements = await ajax.request("get", "/announcements");
            this.setState({
                announcements: announcements
            });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div style={styles.announcementsList}>
				{this.state.announcements.map(listItem => (
    				<AnnouncementsListItem 
    					author={listItem.author}
    					content={listItem.content}
    					audience={listItem.audience}
						timestamp={listItem.timestamp}
   					/>
    			))};			
    		</div>
        );
    }

}
