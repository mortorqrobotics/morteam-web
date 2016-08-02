import React from "react";
import Radium from "radium";

import SearchDropItem from "./SearchDropItem";

let styles = {
    div:{
        display: "block",
        position: "absolute",
	    width: "100%",
	    height: "auto",
	    backgroundColor: "white",
	    zIndex: "300",
    }
}
@Radium
export default class SearchDrop extends React.Component{
    
    static propTypes = {
        userIds: React.PropTypes.array
    
    }
    
    render() {
        return(                          
        <div style ={styles.div}>
            <ul> 
                {this.props.userIds.map(user =>(
                    <SearchDropItem 
                        key={user._id}
                        userid={user._id}
                        name={user.firstname +" "+ user.lastname}
                        profpicpath={user.profpicpath}
                    />
                ))}
            </ul>
        </div>
        )
    }
}
