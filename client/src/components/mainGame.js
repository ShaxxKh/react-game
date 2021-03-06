import { Typography } from "antd";
import React from "react";

import MyLayout from "../views/layout";
import Board from "./board";

function MainGame(props) {
	const mainPlayer = localStorage.getItem("tic-tac-toe-main-player");
	const secondPlayer = localStorage.getItem("tic-tac-toe-second-player");

	return (
		<>
			<Board />
		</>
	);
}

export default MainGame;
