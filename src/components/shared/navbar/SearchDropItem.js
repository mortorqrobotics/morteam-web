import React from "react";
import Radium from "radium";

import ajax from "~/util/ajax";

let styles = {
    li: {
        listStyle: "none",
        height: "auto",
        fontSize: "16px",
        padding: "5px",
        cursor: "pointer",
        borderBottom: "1px solid #c9c9c9",
        //TODO: fix styling
        ":hover": {
            backgroundColor: "#ffcc80",


        }
    },
    span: {
        verticalAlign: "middle",
    },
    img: {
        width: "30px",
        height: "30px",
        objectFit: "cover",
        borderRadius: "5px",
    }

}
@Radium
export default class SearchDropItem extends React.Component {
    static propTypes = {
        userid: React.PropTypes.string,
        name: React.PropTypes.string,
        profpicpath: React.PropTypes.string,
    }

    onClick = () => {
        window.location.assign("/profiles/id/" + this.props.userid);
    }
    render() {
        return (
            <li onClick={this.onClick} style={styles.li}>
        	    <img 
        	        style={styles.img}
        	        src={this.props.profpicpath}
        	    />
        	    <span style={styles.span}>{this.props.name}</span>
        	     
        	
        	</li>
        )
    }
}
