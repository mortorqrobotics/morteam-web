import React from "react";
import Radium from "radium";

let styles = {
	announcementsList: {
		maxWidth: "700px",
		margin: "auto",
		width: "90%",
	}
}

@Radium
export default class AnnouncementsList extends React.Component {

	render() {
		return(
			<div style={styles.announcementsList}>
			</div>
		);
	}

}