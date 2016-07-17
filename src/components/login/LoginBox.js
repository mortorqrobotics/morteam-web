
import ajax from "~/util/ajax.js";
import {
    makeChangeHandlerFactory
} from "../../util";

var styles = {
    loginBox: {
        backgroundColor: "#FFC547",
    	width: "260px",
    	height: "auto",
    	position: "fixed",
    	right: "10px",
    	textAlign: "center",
    	paddingTop: "50px",
    	paddingBottom: "50px",
    	top: "230px",
    },
    fpLink: {
        fontSize: "14px",
    }
}

@Radium
export default class LoginBox extends React.Component {

    constructor(props) {
        super(props);

        this.getChangeHandler = makeChangeHandlerFactory(this);

        this.state = {
            username: "",
            password: "",
            checkedRM: "",
        };

    }


    onSubmit = async function() {

    }.bind(this);


    render() {
        return (
            <div style={styles.loginBox}>

                <LoginUsernameBox onChange={this.getChangeHandler("username")}/>
                <LoginPasswordBox onChange={this.getChangeHandler("password")}/>
                <LoginRememberMeBox onChange={this.getChangeHandler("checkedRM", "checked")} />
                <br>

    			<Link style={styles.fpLink} location="fp" text="Forgot password?" />
    		</div>
        )
    }
}
