import { Typography } from "antd";
import clickSuccess from "../audio/click.mp3";
import React from "react";
import WinAlert from "./winAlert";
import clickWrong from "../audio/busyCell.mp3";

export default class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mainWin: 0,
			secondWin: 0,
			mode: 1,
			end: 0,
			turn: 1,
			firstPlayer: this.firstPlayer,
			secondPlayer: this.secondPlayer,
			cells: [1, 2, 3, 4, 5, 6, 7, 8, 9],
			mainPlayerCells: [],
			secondPlayerCells: [],
		};
		this.clickSuccess = new Audio(clickSuccess);
		this.clickSuccess.load();

		this.clickWrong = new Audio(clickWrong);
		this.clickWrong.load();

		this.mainPlayer = localStorage.getItem("tic-tac-toe-main-player");
		this.secondPlayer = localStorage.getItem("tic-tac-toe-second-player");
		this.onChooseCell = this.onChooseCell.bind(this);
		this.checkEndGame = this.checkEndGame.bind(this);
	}

	onChooseCell(e) {
		if (e.target.textContent === "" && this.state.end === 0) {
			this.clickSuccess.play();
		} else {
			this.clickWrong.play();
		}
		if (e.target.textContent === "" && this.state.end === 0) {
			if (this.state.turn) {
				e.target.textContent = "X";
				for (let i = 1; i < 10; i++) {
					if (e.target.id === i.toString()) {
						let id = this.state.cells.indexOf(i);
						this.state.cells.splice(id, 1);
						this.state.mainPlayerCells.push(i);
					}
				}
			} else {
				e.target.textContent = "O";
				for (let i = 1; i < 10; i++) {
					if (e.target.id === i.toString()) {
						let id = this.state.cells.indexOf(i);
						this.state.cells.splice(id, 1);
						this.state.secondPlayerCells.push(i);
					}
				}
			}
			this.setState({ turn: !this.state.turn });
		}
		if (this.checkEndGame() || this.state.cells.length === 0) {
			this.state.end = 1;
		}
	}
	checkIncludes(first, second, third, cellsToCheck, player) {
		if (
			cellsToCheck.includes(first) &&
			cellsToCheck.includes(second) &&
			cellsToCheck.includes(third)
		) {
			if (player === 1) {
				this.state.mainWin = 1;
			} else {
				this.state.secondWin = 1;
			}
			return true;
		} else return false;
	}
	checkEndGame() {
		if (
			this.checkIncludes(1, 2, 3, this.state.mainPlayerCells, 1) ||
			this.checkIncludes(1, 2, 3, this.state.secondPlayerCells, 1)
		) {
			return true;
		} else if (
			this.checkIncludes(4, 5, 6, this.state.mainPlayerCells, 1) ||
			this.checkIncludes(4, 5, 6, this.state.secondPlayerCells, 2)
		) {
			return true;
		} else if (
			this.checkIncludes(7, 8, 9, this.state.mainPlayerCells, 1) ||
			this.checkIncludes(7, 8, 9, this.state.secondPlayerCells, 2)
		) {
			return true;
		} else if (
			this.checkIncludes(1, 4, 7, this.state.mainPlayerCells, 1) ||
			this.checkIncludes(1, 4, 7, this.state.secondPlayerCells, 2)
		) {
			return true;
		} else if (
			this.checkIncludes(2, 5, 8, this.state.mainPlayerCells, 1) ||
			this.checkIncludes(2, 5, 8, this.state.secondPlayerCells, 2)
		) {
			return true;
		} else if (
			this.checkIncludes(3, 6, 9, this.state.mainPlayerCells, 1) ||
			this.checkIncludes(3, 6, 9, this.state.secondPlayerCells, 2)
		) {
			return true;
		} else if (
			this.checkIncludes(1, 5, 9, this.state.mainPlayerCells, 1) ||
			this.checkIncludes(1, 5, 9, this.state.secondPlayerCells, 2)
		) {
			return true;
		} else if (
			this.checkIncludes(3, 5, 7, this.state.mainPlayerCells, 1) ||
			this.checkIncludes(3, 5, 7, this.state.secondPlayerCells, 2)
		) {
			return true;
		}
		return false;
	}
	showEndGameAlert() {
		if (this.state.end) {
			if (this.state.mainWin) {
				return <WinAlert won={this.mainPlayer} />;
			} else if (this.state.secondWin) {
				return <WinAlert won={this.secondPlayer} />;
			} else {
				return <WinAlert won="Nobody" />;
			}
		}
	}

	render() {
		return (
			<>
				{this.showEndGameAlert()}

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
