var styles = {
    title: {
    	font-size: "40px";
    	margin-bottom: "25px";
    	font-weight: "400";
    	max-width: "800px";
    }
    text: {
    	max-width: "800px";
    	margin-bottom: "85px";
    }
}

@Radium
export default class IntroTextItem extends React.Component {

    static propTypes = {
        title: React.PropTypes.string,
        text: React.PropTypes.string
    }

    render() {
        return (
            <div>
                <h1 style={styles.title}>{this.props.title}</h1>
                <h2 style={styles.text}>{this.props.text}</h2>
            </div>
        )
    }
}
