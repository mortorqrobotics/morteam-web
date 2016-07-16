
@Radium
export default class SubmitButton extends React.Component {

    static propTypes = {
        value: React.PropTypes.string,
        onChange: React.PropTypes.func,
        style: React.PropTypes.object
    }

    render() {
        return (
            <input
                type="submit"
                value={this.props.text}
                onChange={this.props.onChange}
                style={this.props.style}
            />
        )
    }
}
