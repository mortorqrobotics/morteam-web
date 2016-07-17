var styles = {
    introText: {
    	width: "calc(100% - 490px)"
    	textAlign: "justify";
    	paddingTop: "100px";
    	paddingLeft: "100px";
    	paddingRight: "100px";
    }
}

@Radium
export default class IntroText extends React.Component {

    render() {
        return (
            <div style={styles.introText}>
    			<div style={}>
                    <IntroTextItem title="Welcome" text="" />
                    <IntroTextItem title="Subdivisions" text="" />
                    <IntroTextItem title="Announcements" text="" />
                    <IntroTextItem title="Chat" text="" />
                    <IntroTextItem title="Drive" text="" />
                    <IntroTextItem title="Calendar" text="" />
                </div>
            </div>
        )
    }

}
