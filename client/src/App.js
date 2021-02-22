import React from "react";
import RegisterPage from "./views/register";
import "antd/dist/antd.css";
import { Route, Switch } from "react-router";
import MainPage from "./views/main";

function App() {
	return (
		<Switch>
			<Route exact path="/" component={RegisterPage} />
			<Route path="/main" component={MainPage} />
		</Switch>
	);
}

export default App;
