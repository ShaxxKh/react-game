import React from "react";
import { Alert, Button, Space } from "antd";
import { Link } from "react-router-dom";

export default class WinAlert extends React.Component {
	constructor(props) {
		super(props);

		this.retry = this.retry.bind(this);
	}
	retry() {
		localStorage.removeItem("tic-tac-toe-main-player");
		localStorage.removeItem("tic-tac-toe-second-player");
	}
	render() {
		return (
			<>
				<Alert
					message="Congratulations!!!"
					description={`${this.props.won} won the game!!!`}
					type="info"
					action={
						<Space direction="vertical">
							<Link to="/">
								<Button size="small" type="primary">
									New Game
								</Button>
							</Link>

							<Button onClick={this.retry} size="small" danger type="ghost">
								<Link to="/">Leave Game</Link>
							</Button>
						</Space>
					}
					closable
				/>
			</>
		);
	}
}
