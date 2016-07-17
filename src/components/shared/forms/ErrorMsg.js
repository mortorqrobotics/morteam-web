@Radium
export default class ErrorMsg extends React.Component {

    static propTypes = {
        message: React.PropTypes.string,
    }

    render() {
        return (
            <span style={}>{this.props.message}</span>
        )
    }
}
