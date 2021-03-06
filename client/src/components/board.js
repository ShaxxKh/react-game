import React from "react";

export default class Board extends React.Component {
	constructor(props) {
		super(props);

		if (this.props.mainPlayer === null || this.props.secondPlayer === null) {
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
