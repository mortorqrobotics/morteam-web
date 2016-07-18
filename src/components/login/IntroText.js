var styles = {
    introText: {
        width: "calc(100% - 490px)"
        textAlign: "justify";
        paddingTop: "100px";
        paddingLeft: "100px";
        paddingRight: "100px";
    },
    landingBoxMain: {
        lineHeight: "32.5px",
        maxWidth: "800px",
        margin: "auto",
    },
}

@Radium
export default class IntroText extends React.Component {

    render() {
        return (
            <div style={styles.introText}>
    			<div style={styles.landingBoxMain}>
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
