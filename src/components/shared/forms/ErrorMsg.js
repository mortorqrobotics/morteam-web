@Radium
export default class ErrorMsg extends React.Component {

    static propTypes = {
        message: React.PropTypes.string,
    }

    render() {
        return (
            <span>{this.props.message}</span>
        )
    }
}
