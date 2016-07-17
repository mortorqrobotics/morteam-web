import ajax from "~/util/ajax.js";
import {
    makeChangeHandlerFactory
} from "../../util";

var styles = {

}

@Radium
export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.getChangeHandler = makeChangeHandlerFactory(this);

        this.state = {
            username: "",
            password: "",
        };

    }


    onSubmit = async function() {

    }.bind(this);


    render() {
        return (
            <div>

            </div>
        )
    }
}

window.Page = Login;
