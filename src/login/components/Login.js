import React from "react";
import Radium from "radium";

import Root, { pageInit } from "~/shared/components/Root";
import TopBar from "~/login/components/TopBar";
import IntroText from "~/login/components/IntroText";
import LoginBox from "~/login/components/LoginBox";

@Radium
class Login extends React.Component {

	render() {
		return (
			<Root pageName="login">
				<TopBar />
				<IntroText />
				<LoginBox />
			</Root>
		)
	}
}

pageInit(Login);
