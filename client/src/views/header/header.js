import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import music from "../../audio/main.mp3";
import { Button, notification, Slider, Row, Col } from "antd";
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	LeftSquareOutlined,
} from "@ant-design/icons";

export default class MyHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			volume: 1,
			inputValue: 1,
			collapsed: false,
			soundVolume: 1,
		};

		this.args = {
			message: "Notification Title",
			description:
				"Close this to unmute the music. You can mute it later in the menu on the left.",
			duration: 0,
			onClose: () => {
				this.audio.play();
			},
		};
		this.audio = new Audio(music);
		this.audio.loop = true;
		this.audio.load();

		this.username = localStorage.getItem("tic-tac-toe-main-player");

		this.leaveGame = this.leaveGame.bind(this);
		this.toggleMusic = this.toggleMusic.bind(this);
	}

	componentDidMount() {
		notification.open(this.args);
	}

	toggleCollapsed = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	leaveGame() {
		localStorage.removeItem("tic-tac-toe-main-player");
		localStorage.removeItem("tic-tac-toe-second-player");
		this.props.resetState();
	}

	onChangeMusicVolume = (value) => {
		if (isNaN(value)) {
			return;
		}
		this.setState({
			inputValue: value,
		});
		this.audio.volume = value;
	};

	toggleMusic(checked) {
		if (checked) {
			this.audio.play();
		} else {
			this.audio.pause();
		}
		console.log(`switch to ${checked}`);
		notification.destroy();
	}

	render() {
		const { inputValue } = this.state;
		return (
			<div>
				<div className="header">
					<div style={{ width: 300 }}>
						<div>
							<div>
								{" "}
								Music
								<Row style={{ lineHeight: "0px" }}>
									<Col span={12}>
										<Slider
											min={0}
											max={1}
											onChange={this.onChangeMusicVolume}
											value={typeof inputValue === "number" ? inputValue : 0}
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
					<div>
						<h1 className="heading">
							Hi {this.username}!
							<br />
							Welcome to Tic-Tac-Toe
						</h1>
						<div className="header-buttons">
							<Button onClick={this.props.resetState} type="primary">
								2 Players
							</Button>
							<Button type="primary">With Computer</Button>
							<Button type="primary">2 Devices</Button>
							<Button onClick={this.props.resetState} type="primary">
								New Game
							</Button>
							<Button onClick={this.props.saveGame} type="primary">
								Save Game
							</Button>
						</div>
					</div>
					<Link to="/">
						<Button onClick={this.leaveGame} icon={<LeftSquareOutlined />} />
					</Link>
				</div>
			</div>
		);
	}
}
