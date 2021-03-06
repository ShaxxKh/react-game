import React from "react";
import { withRouter } from "react-router-dom";

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.mainPlayer = localStorage.getItem("tic-tac-toe-main-player");
		this.secondPlayer = localStorage.getItem("tic-tac-toe-second-player");
		if (this.mainPlayer === null || this.secondPlayer === null) {
			this.props.history.push("/");
		}
	}

	render() {
		return (
			<>
				{this.props.showEndGameAlert()}

				<h1>It is {this.props.findTurn()}'s turn</h1>
				<div className="board">
					{this.props.cellsContent.map((elem, i) => {
						return (
							<button
								onClick={(e) => {
									this.props.onChooseCell(e);
									console.log(this.props);
								}}
								id={i + 1}
								className="cell"
								key={i}
							>
								{this.props.cellsContent[i].content}
							</button>
						);
					})}
				</div>
			</>
		);
	}
}

export default withRouter(Board);
