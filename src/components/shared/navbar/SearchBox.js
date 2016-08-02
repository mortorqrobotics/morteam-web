import React from "react";
import Radium from "radium";

import TextBox from "../forms/TextBox";
import SearchDrop from "./SearchDrop";
import ajax from "~/util/ajax";

let styles = {
    li:{
        width: "360px",
	    marginRight: "10px",
	    position: "relative",
	    display: "inline-block",
          "@media screen and (max-width: 700px)": {
            width: "55% ",
        
        },
        "@media screen and (max-width: 490px)": {
	    	width: "41% ",
	    	
    	},
	    "@media screen and (max-width: 330px)": {
	        width: "60% ",
	        
    	},
    	"@media screen and (max-width: 295px)": {
	        width: "50% ",
	       
    	},
    
    },
    textbox: {
        border: "0",
    	height: "34px",
	    width: "100%",
	    position: "relative",
	    fontSize: "20px",
    	padding: "8px",
    	marginTop: "3px",
    	borderRadius: "5px",
    }   
}

@Radium
export default class SearchBox extends React.Component{
   
    constructor(props){
        super(props);
        
        this.state = {
            query: "",
            userIds: []
        }
    }
     sendQuery = async(query) => {
        if (query == "") {
            this.setState({
                userIds: []
            });
        } else {
            try {
                let { data } = await ajax.request("get", "/users/search?search=" + query);
                this.setState({
                    userIds: data,
                });
            } catch (err) {
                console.log(err);
            }
        //TODO: make this faster
            
        }
    }
    onChange = (e) =>{
        this.setState({
            query: e.target.value,
        });
        this.sendQuery(e.target.value);
    }
    
    render() {
   
        
        return(                          
        	    <li style={styles.li}>
        	        <TextBox
        	            style={styles.textbox}
        	            placeholder={"search"}
        	            onChange={this.onChange}
        	            value={this.state.query}
        	        />
        	    
        	        <SearchDrop userIds={this.state.userIds} />
        	    </li>
        	
        )
    }
}
