import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { Button, Slider, Row, Col } from "antd";
import { LeftSquareOutlined } from "@ant-design/icons";

export default class MyHeader extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="header">
				<div className="settings">
					<div>
						<div>
							{" "}
							Music
							<Row style={{ lineHeight: "0px" }}>
								<Col span={12}>
									<Slider
										min={0}
										max={1}
										onChange={this.props.onChangeMusicVolume}
										value={
											typeof this.props.musicVolume === "number"
												? this.props.musicVolume
												: 0
										}
										step={0.01}
									/>
								</Col>
							</Row>
						</div>
						<div>
							{" "}
							Sounds
							<Row style={{ lineHeight: "0px" }}>
								<Col span={12}>
									<Slider
										min={0}
										max={1}
										onChange={this.props.onChangeSoundVolume}
										value={
											typeof this.props.soundVolume === "number"
												? this.props.soundVolume
												: 0
										}
										step={0.01}
									/>
								</Col>
							</Row>
						</div>
					</div>
				</div>
				<div className="menuButtons">
					<h1 className="heading">
						Hi {this.props.mainPlayer}!
						<br />
						Welcome to Tic-Tac-Toe
					</h1>
					<div className="header-buttons">
						<Button onClick={this.props.newGame} type="primary">
							2 Players
						</Button>
						<Button type="primary">With Computer</Button>
						<Button type="primary">2 Devices</Button>
						<Button onClick={this.props.newGame} type="primary">
							New Game
						</Button>
						<Button onClick={this.props.saveGame} type="primary">
							Save Game
						</Button>
						<Link to="/statistics">
							<Button type="primary">Statistics</Button>
						</Link>
						<Link to="/hotKeys">
							<Button type="primary">Hotkeys list</Button>
						</Link>
					</div>
				</div>
				<div className="leaveButton">
					<Link className="leaveLink" to="/">
						<Button
							onClick={this.props.leaveGame}
							icon={<LeftSquareOutlined />}
						/>
					</Link>
				</div>
			</div>
		);
	}
}
