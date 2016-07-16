import SubmitButton from "~/components/shared/forms/SubmitButton";

var styles = {
    submitButton: {
        "backgroundColor": "#0099FF",
        "border": "0",
        "borderRadius": "1px",
        "fontSize": "32px",
        "position": "absolute",
        "width": "300px",
        "left": "50%",
        "marginLeft": "-150px",
        "height": "50px",
        "top": "530px",
        "boxShadow": "1.5px 3px 8px -2px #BA7000",
        ":hover": {
            "backgroundColor": "#008AE6",
            "cursor": "pointer"
        }
    }
}

@Radium
export default class SubmitSignupButton extends React.Component {

    render() {
        return (
            <SubmitButton
                value="Submit"
                style={styles.submitButton}
            />
        )
    }
}
