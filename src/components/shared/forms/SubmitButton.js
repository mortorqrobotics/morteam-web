@Radium
export default class SubmitButton extends React.Component {

    static propTypes = {
        value: React.PropTypes.string,
        style: React.PropTypes.object
    }

    render() {
        return (
            <input
                type="submit"
                value={this.props.value}
                style={this.props.style}
            />
        )
    }
}
