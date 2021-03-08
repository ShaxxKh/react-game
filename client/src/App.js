import "antd/dist/antd.css";
import React from "react";
import { Route, Switch } from "react-router";
import RegisterPage from "./views/register";
import MyHeader from "./views/header/header";
import MyFooter from "./views/footer/footer";
import Board from "./components/board";
import WinAlert from "./components/winAlert";
import clickSuccess from "./audio/click.mp3";
import clickWrong from "./audio/busyCell.mp3";
import music from "./audio/main.mp3";
import StatisticsPage from "./components/statisticsPage";
import { withRouter } from "react-router-dom";
import Hotkeys from "react-hot-keys";
import HotKeysPage from "./components/hotKeysPage";
import "./App.css";

import { Layout, notification } from "antd";
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
			musicVolume: 1,
		};

		this.args = {
			message: "Notification Title",
			description:
				"Close this to unmute the music. You can mute it later in the menu on the left.",
			duration: 0,
			onClose: () => {
				this.music.play();
			},
		};

		this.clickSuccess = new Audio(clickSuccess);
		this.clickSuccess.load();

		this.clickWrong = new Audio(clickWrong);
		this.clickWrong.load();

		this.music = new Audio(music);
		this.music.loop = true;
		this.music.load();

		this.onChooseCell = this.onChooseCell.bind(this);
		this.checkEndGame = this.checkEndGame.bind(this);
		this.saveWinner = this.saveWinner.bind(this);
		this.findTurn = this.findTurn.bind(this);
		this.resetState = this.resetState.bind(this);
		this.onChangeSoundVolume = this.onChangeSoundVolume.bind(this);
		this.saveGame = this.saveGame.bind(this);
		this.onUnload = this.onUnload.bind(this);
		this.bestCell = this.bestCell.bind(this);
		this.minimax = this.minimax.bind(this);
		this.leaveGame = this.leaveGame.bind(this);
		this.login = this.login.bind(this);
		this.newGame = this.newGame.bind(this);
	}
	async onUnload(e) {
		e.preventDefault();
		this.setState({
			mainPlayer: localStorage.getItem("tic-tac-toe-main-player"),
			secondPlayer: localStorage.getItem("tic-tac-toe-second-player"),
		});
		await localStorage.setItem("last-game", JSON.stringify(this.state));
	}
	componentDidMount() {
		notification.open(this.args);
		window.onbeforeunload = (e) => {
			this.onUnload(e);
			return undefined;
		};
	}
	toggleMusic(checked) {
		if (checked) {
			this.music.play();
		} else {
			this.music.pause();
		}
		notification.destroy();
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
				if (
					(this.checkEndGame(this.state.mainPlayerCells, 1) ||
						this.state.cells.length === 0) &&
					this.state.end === 0
				) {
					this.setState({ end: 1 });
					this.saveWinner();
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
				if (
					(this.checkEndGame(this.state.secondPlayerCells, 2) ||
						this.state.cells.length === 0) &&
					this.state.end === 0
				) {
					this.setState({ end: 1 });
					this.saveWinner();
				}
			}
			this.setState({ turn: !this.state.turn });
		}
	}
	checkIncludes(first, second, third, cellsToCheck, player) {
		if (
			cellsToCheck.includes(first) &&
			cellsToCheck.includes(second) &&
			cellsToCheck.includes(third)
		) {
			console.log(player);
			if (player === 1) {
				this.state.mainWin = 1;
			} else {
				this.state.secondWin = 1;
			}
			return true;
		} else return false;
	}
	checkEndGame(playerCells, player) {
		if (this.checkIncludes(1, 2, 3, playerCells, player)) {
			return true;
		} else if (this.checkIncludes(4, 5, 6, playerCells, player)) {
			return true;
		} else if (this.checkIncludes(7, 8, 9, playerCells, player)) {
			return true;
		} else if (this.checkIncludes(1, 4, 7, playerCells, player)) {
			return true;
		} else if (this.checkIncludes(2, 5, 8, playerCells, player)) {
			return true;
		} else if (this.checkIncludes(3, 6, 9, playerCells, player)) {
			return true;
		} else if (this.checkIncludes(1, 5, 9, playerCells, player)) {
			return true;
		} else if (this.checkIncludes(3, 5, 7, playerCells, player)) {
			return true;
		}
		return false;
	}
	showEndGameAlert = () => {
		if (this.state.end) {
			if (this.state.mainWin) {
				return (
					<WinAlert resetState={this.resetState} won={this.state.mainPlayer} />
				);
			} else if (this.state.secondWin) {
				return (
					<WinAlert
						resetState={this.resetState}
						won={this.state.secondPlayer}
					/>
				);
			} else {
				return <WinAlert resetState={this.resetState} won="Nobody" />;
			}
		}
	};
	saveWinner(e) {
		let winner = localStorage.getItem("tic-tac-toe-main-player");
		let opponent = localStorage.getItem("tic-tac-toe-second-player");
		if (this.state.secondWin) {
			winner = localStorage.getItem("tic-tac-toe-second-player");
			opponent = localStorage.getItem("tic-tac-toe-main-player");
		}
		let winnerData = {
			username: winner,
			opponent: opponent,
			mode: this.state.mode,
		};
		console.log(winnerData, this.state.secondWin, this.state.mainWin);
		const winners = JSON.parse(localStorage.getItem("winners")) || [];
		winners.push(winnerData);
		localStorage.setItem("winners", JSON.stringify(winners));
		// axios
		// 	.post("/saveWinner", winnerData)

		// 	.then(() => {
		// 		console.log(winnerData);
		// 	})
		// 	.catch(() => {
		// 		throw new Error("Error with server");
		// 	});
	}
	findTurn() {
		return this.state.turn ? this.state.mainPlayer : this.state.secondPlayer;
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
			mainPlayer: localStorage.getItem("tic-tac-toe-main-player"),
			secondPlayer: localStorage.getItem("tic-tac-toe-second-player"),
			cells: [1, 2, 3, 4, 5, 6, 7, 8, 9],
			mainPlayerCells: [],
			secondPlayerCells: [],
			soundVolume: 1,
		});
	}
	newGame() {
		this.resetState();
		this.props.history.push("/2players");
	}
	onChangeMusicVolume = (value) => {
		if (isNaN(value)) {
			return;
		}
		this.setState({
			musicVolume: value,
		});
		this.music.volume = value;
	};
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
	bestCell() {
		if (this.minimax(this.state.cells, this.secondPlayer, 2) !== undefined) {
			return this.minimax(this.state.cells, this.secondPlayer, 2).index;
		}
	}
	minimax(newBoard, player, id) {
		let emptyCells = this.state.cells;

		if (this.checkEndGame(this.state.mainPlayerCells)) {
			return { score: -10 };
		} else if (this.checkEndGame(this.state.secondPlayerCells)) {
			return { score: 20 };
		} else if (emptyCells.length === 0) {
			return { score: 0 };
		}

		let moves = [];

		for (let i = 0; i < emptyCells.length; i++) {
			console.log(emptyCells);
			let move = {};
			move.index = emptyCells[i];

			if (id === 2) {
				this.state.secondPlayerCells.push(emptyCells[i]);
			} else if (id === 1) {
				this.state.mainPlayerCells.push(emptyCells[i]);
			}
			let removedItem = emptyCells.splice(i, 1);
			console.log(this.state.secondPlayerCells);

			if (player === this.secondPlayer) {
				let result = this.minimax(emptyCells, this.mainPlayer, 1);
				if (result !== undefined) {
					move.score = result.score;
				}
			} else {
				let result = this.minimax(emptyCells, this.secondPlayer, 2);
				if (result !== undefined) {
					move.score = result.score;
				}
			}

			if (id === 2) {
				this.state.secondPlayerCells.splice(-1, 1);
			} else if (id === 1) {
				this.state.mainPlayerCells.splice(-1, 1);
			}
		}

		let bestMove;
		if (player === this.secondPlayer) {
			let bestScore = -10000;
			for (let i = 0; i < moves.length; i++) {
				if (moves[i].score > bestScore) {
					bestScore = moves[i].score;
					bestMove = i;
				}
			}
		} else {
			let bestScore = 10000;
			for (let i = 0; i < moves.length; i++) {
				if (moves[i].score < bestScore) {
					bestScore = moves[i].score;
					bestMove = i;
				}
			}
		}
		console.log(moves[bestMove]);
		return moves[bestMove];
	}
	leaveGame() {
		localStorage.removeItem("tic-tac-toe-main-player");
		localStorage.removeItem("tic-tac-toe-second-player");
		localStorage.removeItem("last-game");
		this.setState({ mainPlayer: null, secondPlayer: null });
		this.resetState();
		this.props.history.push("/");
	}
	login() {
		this.setState({
			mainPlayer: localStorage.getItem("tic-tac-toe-main-player"),
			secondPlayer: localStorage.getItem("tic-tac-toe-second-player"),
		});
	}
	onFinish = (values) => {
		this.setState({
			mainPlayer: values.mainPlayer,
			secondPlayer: values.secondPlayer,
		});
		localStorage.setItem("tic-tac-toe-main-player", values.mainPlayer);
		localStorage.setItem("tic-tac-toe-second-player", values.secondPlayer);
		this.props.history.push("/2players");
	};
	onKeyR(keyName, e, handle) {
		console.log(e);
		if (e.shiftKey && e.key === "R") {
			this.newGame();
		} else if (e.shiftKey && e.key === "Q") {
			this.leaveGame();
		} else if (e.shiftKey && e.key === "ArrowUp") {
			this.setState({ musicVolume: this.state.musicVolume + 0.05 });
		} else if (e.shiftKey && e.key === "ArrowDown") {
			this.setState({ musicVolume: this.state.musicVolume - 0.05 });
		} else if (e.ctrlKey && e.key === "ArrowUp") {
			this.setState({ soundVolume: this.state.soundVolume + 0.05 });
		} else if (e.ctrlKey && e.key === "ArrowDown") {
			this.setState({ soundVolume: this.state.soundVolume - 0.05 });
		}
	}

	render() {
		return (
			<>
				<Hotkeys
					keyName="shift+r,shift+q,shift+up,shift+down,ctrl+up,ctrl+down"
					onKeyUp={this.onKeyR.bind(this)}
				></Hotkeys>
				<Layout className="layout">
					<MyHeader
						musicVolume={this.state.musicVolume}
						soundVolume={this.state.soundVolume}
						mainPlayer={this.state.mainPlayer}
						secondPlayer={this.state.secondPlayer}
						resetState={this.resetState}
						newGame={this.newGame}
						onChangeMusicVolume={this.onChangeMusicVolume}
						onChangeSoundVolume={this.onChangeSoundVolume}
						saveGame={this.saveGame}
						leaveGame={this.leaveGame}
					/>
					<Content className="content">
						<Switch>
							<Route exact path="/">
								<RegisterPage
									mainPlayer={this.state.mainPlayer}
									secondPlayer={this.state.secondPlayer}
									login={this.login}
									onFinish={this.onFinish}
								/>
							</Route>
							<Route path="/2players">
								<Board
									{...this.state}
									cellsContent={this.state.cellsContent}
									onChooseCell={this.onChooseCell}
									showEndGameAlert={this.showEndGameAlert}
									findTurn={this.findTurn}
									bestCell={this.bestCell}
								/>
							</Route>
							<Route exact path="/statistics" component={StatisticsPage} />
							<Route exact path="/hotKeys" component={HotKeysPage} />
						</Switch>
					</Content>
					<MyFooter />
				</Layout>
			</>
		);
	}
}

export default withRouter(App);
