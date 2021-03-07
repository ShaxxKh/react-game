import "antd/dist/antd.css";
import React from "react";
import { Route, Switch } from "react-router";
import MainGame from "./components/mainGame";
import RegisterPage from "./views/register";
import MyHeader from "./views/header/header";
import MyFooter from "./views/footer/footer";
import Board from "./components/board";
import WinAlert from "./components/winAlert";
import axios from "axios";
import clickSuccess from "./audio/click.mp3";
import clickWrong from "./audio/busyCell.mp3";

import { Layout } from "antd";
const { Content } = Layout;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.mainPlayer = localStorage.getItem("tic-tac-toe-main-player");
		this.secondPlayer = localStorage.getItem("tic-tac-toe-second-player");
		this.state = JSON.parse(localStorage.getItem("last-game")) || {
			mainWin: 0,
			secondWin: 0,
			mode: 1,
			end: 0,
			turn: 1,
			cellsContent: [
				{ content: "", id: 1 },
				{ content: "", id: 2 },
				{ content: "", id: 3 },
				{ content: "", id: 4 },
				{ content: "", id: 5 },
				{ content: "", id: 6 },
				{ content: "", id: 7 },
				{ content: "", id: 8 },
				{ content: "", id: 9 },
			],
			mainPlayer: this.mainPlayer,
			secondPlayer: this.secondPlayer,
			cells: [1, 2, 3, 4, 5, 6, 7, 8, 9],
			mainPlayerCells: [],
			secondPlayerCells: [],
			soundVolume: 1,
		};

		this.clickSuccess = new Audio(clickSuccess);
		this.clickSuccess.load();

		this.clickWrong = new Audio(clickWrong);
		this.clickWrong.load();

		this.onChooseCell = this.onChooseCell.bind(this);
		this.checkEndGame = this.checkEndGame.bind(this);
		this.saveWinner = this.saveWinner.bind(this);
		this.findTurn = this.findTurn.bind(this);
		this.resetState = this.resetState.bind(this);
		this.onChangeSoundVolume = this.onChangeSoundVolume.bind(this);
		this.saveGame = this.saveGame.bind(this);
		this.onUnload = this.onUnload.bind(this);
	}
	async onUnload(e) {
		e.preventDefault();
		await localStorage.setItem("last-game", JSON.stringify(this.state));
		console.log("asd");
	}
	componentDidMount() {
		window.onbeforeunload = (e) => {
			this.onUnload(e);
			return undefined;
		};
	}
	onChooseCell(e) {
		if (e.target.textContent === "" && this.state.end === 0) {
			this.clickSuccess.play();
		} else {
			this.clickWrong.play();
		}
		if (e.target.textContent === "" && this.state.end === 0) {
			if (this.state.turn) {
				for (let i = 1; i < 10; i++) {
					if (e.target.id === i.toString()) {
						this.setState((state) => {
							const cells = state.cellsContent;
							cells[i - 1].content = "X";
						});
						let id = this.state.cells.indexOf(i);
						this.state.cells.splice(id, 1);
						this.state.mainPlayerCells.push(i);
					}
				}
			} else {
				for (let i = 1; i < 10; i++) {
					if (e.target.id === i.toString()) {
						this.setState((state) => {
							const cells = state.cellsContent;
							cells[i - 1].content = "O";
						});
						let id = this.state.cells.indexOf(i);
						this.state.cells.splice(id, 1);
						this.state.secondPlayerCells.push(i);
					}
				}
			}
			this.setState({ turn: !this.state.turn });
		}
		if (
			(this.checkEndGame() || this.state.cells.length === 0) &&
			this.state.end === 0
		) {
			this.setState({ end: 1 });
			this.saveWinner();
		}
	}
	checkIncludes(first, second, third, cellsToCheck, player) {
		if (
			cellsToCheck.includes(first) &&
			cellsToCheck.includes(second) &&
			cellsToCheck.includes(third)
		) {
			if (player === 1) {
				this.setState({ mainWin: 1 });
			} else {
				this.setState({ secondWin: 1 });
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
	showEndGameAlert = () => {
		if (this.state.end) {
			if (this.state.mainWin) {
				return <WinAlert resetState={this.resetState} won={this.mainPlayer} />;
			} else if (this.state.secondWin) {
				return (
					<WinAlert resetState={this.resetState} won={this.secondPlayer} />
				);
			} else {
				return <WinAlert resetState={this.resetState} won="Nobody" />;
			}
		}
	};
	saveWinner() {
		let winner = this.mainPlayer;
		let opponent = this.secondPlayer;
		if (this.state.secondWin) {
			winner = this.secondPlayer;
			opponent = this.mainPlayer;
		}
		let winnerData = {
			username: winner,
			opponent: opponent,
			mode: this.state.mode,
		};
		axios({
			method: "POST",
			data: winnerData,
			withCredentials: true,
			url: "/saveWinner",
		})
			.then(() => {
				console.log(winnerData);
			})
			.catch(() => {
				throw new Error("Error with server");
			});
	}
	findTurn() {
		return this.state.turn ? this.mainPlayer : this.secondPlayer;
	}
	resetState() {
		// this.setState(JSON.parse(JSON.stringify(initialState)));
		this.setState({
			mainWin: 0,
			secondWin: 0,
			mode: 1,
			end: 0,
			turn: 1,
			cellsContent: [
				{ content: "", id: 1 },
				{ content: "", id: 2 },
				{ content: "", id: 3 },
				{ content: "", id: 4 },
				{ content: "", id: 5 },
				{ content: "", id: 6 },
				{ content: "", id: 7 },
				{ content: "", id: 8 },
				{ content: "", id: 9 },
			],
			cells: [1, 2, 3, 4, 5, 6, 7, 8, 9],
			mainPlayerCells: [],
			secondPlayerCells: [],
			soundVolume: 1,
		});
	}
	onChangeSoundVolume(value) {
		if (isNaN(value)) {
			return;
		}
		this.setState({ soundVolume: value });
		this.clickSuccess.volume = this.state.soundVolume;
		this.clickWrong.volume = this.state.soundVolume;
	}
	saveGame() {
		const gamesContainer =
			JSON.parse(localStorage.getItem("gamesContainer")) || [];
		gamesContainer.push(this.state);
		localStorage.setItem("gamesContainer", JSON.stringify(gamesContainer));
	}

	render() {
		return (
			<>
				<Layout>
					<MyHeader
						{...this.state}
						resetState={this.resetState}
						onChangeSoundVolume={this.onChangeSoundVolume}
						saveGame={this.saveGame}
					/>
					<Content>
						<Switch>
							<Route exact path="/" component={RegisterPage} />
							<Route path="/2players">
								<Board
									{...this.state}
									cellsContent={this.state.cellsContent}
									onChooseCell={this.onChooseCell}
									showEndGameAlert={this.showEndGameAlert}
									findTurn={this.findTurn}
								/>
							</Route>
						</Switch>
					</Content>
					<MyFooter />
				</Layout>
			</>
		);
	}
}

export default App;
