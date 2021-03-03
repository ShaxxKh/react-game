import "antd/dist/antd.css";
import React from "react";
import { Route, Switch } from "react-router";
import MainGame from "./components/mainGame";
import RegisterPage from "./views/register";
import MyHeader from "./views/header/header";
import MyFooter from "./views/footer/footer";

import { Layout } from "antd";
const { Content } = Layout;

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<>
				<Layout>
					<MyHeader />
					<Content>
						<Switch>
							<Route exact path="/" component={RegisterPage} />
							<Route path="/2players" component={MainGame} />
						</Switch>
					</Content>
					<MyFooter />
				</Layout>
			</>
		);
	}
}

export default App;
