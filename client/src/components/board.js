import { Typography } from "antd";
import music from "../audio/click.mp3";
import React from "react";

export default class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			turn: 1,
			firstPlayer: this.firstPlayer,
			secondPlayer: this.secondPlayer,
			cells: [],
			one: 0,
			two: 0,
			three: 0,
			four: 0,
			five: 0,
			six: 0,
			seven: 0,
			eight: 0,
			nine: 0,
		};
		this.audio = new Audio(music);
		this.audio.load();

		this.mainPlayer = localStorage.getItem("tic-tac-toe-main-player");
		this.secondPlayer = localStorage.getItem("tic-tac-toe-second-player");
		this.onChooseCell = this.onChooseCell.bind(this);
		this.checkEndGame = this.checkEndGame.bind(this);
	}

	onChooseCell(e) {
		this.audio.play();
		this.setState({});
		if (e.target.textContent === "") {
			if (this.state.turn) {
				e.target.textContent = "X";
				if (e.target.id === "1") {
					this.state.one = 1;
				}
				if (e.target.id === "2") {
					this.state.two = 1;
				}
				if (e.target.id === "3") {
					this.state.three = 1;
				}
				if (e.target.id === "4") {
					this.state.four = 1;
				}
				if (e.target.id === "5") {
					this.state.five = 1;
				}
				if (e.target.id === "6") {
					this.state.six = 1;
				}
				if (e.target.id === "7") {
					this.state.seven = 1;
				}
				if (e.target.id === "8") {
					this.state.eight = 1;
				}
				if (e.target.id === "9") {
					this.state.nine = 1;
				}
			} else {
				e.target.textContent = "O";
				if (e.target.id === "1") {
					this.state.one = 2;
				}
				if (e.target.id === "2") {
					this.state.two = 2;
				}
				if (e.target.id === "3") {
					this.state.three = 2;
				}
				if (e.target.id === "4") {
					this.state.four = 2;
				}
				if (e.target.id === "5") {
					this.state.five = 2;
				}
				if (e.target.id === "6") {
					this.state.six = 2;
				}
				if (e.target.id === "7") {
					this.state.seven = 2;
				}
				if (e.target.id === "8") {
					this.state.eight = 2;
				}
				if (e.target.id === "9") {
					this.state.nine = 2;
				}
			}
			this.setState({ turn: !this.state.turn });
		}
		if (this.checkEndGame()) {
			console.log("won");
		}
	}

	checkEndGame() {
		console.log(this.state.one, this.state.two, this.state.three);
		if (
			this.state.one === this.state.two &&
			this.state.one === this.state.three &&
			this.state.one !== 0
		) {
			return true;
		} else if (
			this.state.four === this.state.five &&
			this.state.four === this.state.six &&
			this.state.four !== 0
		) {
			return true;
		} else if (
			this.state.seven === this.state.eight &&
			this.state.seven === this.state.nine &&
			this.state.seven !== 0
		) {
			return true;
		} else if (
			this.state.one === this.state.four &&
			this.state.one === this.state.seven &&
			this.state.one !== 0
		) {
			return true;
		} else if (
			this.state.two === this.state.five &&
			this.state.two === this.state.eight &&
			this.state.two !== 0
		) {
			return true;
		} else if (
			this.state.three === this.state.six &&
			this.state.three === this.state.nine &&
			this.state.three !== 0
		) {
			return true;
		} else if (
			this.state.one === this.state.five &&
			this.state.one === this.state.nine &&
			this.state.one !== 0
		) {
			return true;
		} else if (
			this.state.three === this.state.five &&
			this.state.three === this.state.seven &&
			this.state.three !== 0
		) {
			return true;
		}
		return false;
	}

	render() {
		return (
			<>
				<h1>
					It is {this.state.turn ? this.mainPlayer : this.secondPlayer}'s turn
				</h1>
				<div className="board">
					<button
						onClick={(e) => {
							this.onChooseCell(e);
						}}
						id="1"
						className="cell"
					></button>
					<button onClick={this.onChooseCell} id="2" className="cell"></button>
					<button onClick={this.onChooseCell} id="3" className="cell"></button>
					<button onClick={this.onChooseCell} id="4" className="cell"></button>
					<button onClick={this.onChooseCell} id="5" className="cell"></button>
					<button onClick={this.onChooseCell} id="6" className="cell"></button>
					<button onClick={this.onChooseCell} id="7" className="cell"></button>
					<button onClick={this.onChooseCell} id="8" className="cell"></button>
					<button onClick={this.onChooseCell} id="9" className="cell"></button>
				</div>
			</>
		);
	}
}
