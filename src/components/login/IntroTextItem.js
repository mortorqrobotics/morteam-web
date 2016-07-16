@Radium
export default class IntroTextItem extends React.Component {

    static propTypes = {
        title: React.PropTypes.string,
        text: React.PropTypes.string
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.text}</h2>
            </div>
        )
    }
}
