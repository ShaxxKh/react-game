import React from "react";
import { Form, Input, Button } from "antd";
import { Link, withRouter } from "react-router-dom";

const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 10,
	},
};
const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16,
	},
};

class RegisterPage extends React.Component {
	constructor(props) {
		super(props);
		let mainPlayer = null;
		let secondPlayer = null;
		mainPlayer = localStorage.getItem("tic-tac-toe-main-player");
		secondPlayer = localStorage.getItem("tic-tac-toe-main-player");

		if (mainPlayer !== null && secondPlayer !== null) {
			this.props.history.push("/2players");
		}
	}

	onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};
	render() {
		return (
			<Form
				{...layout}
				name="basic"
				initialValues={{
					remember: true,
				}}
				onFinish={this.props.onFinish}
				onFinishFailed={this.onFinishFailed}
				style={{ width: "100%" }}
			>
				<Form.Item
					label="Main Player"
					name="mainPlayer"
					rules={[
						{
							required: true,
							message: "Please input name of the main Player!",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Second Player"
					name="secondPlayer"
					rules={[
						{
							required: true,
							message: "Please input name of the second Player!",
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item {...tailLayout}>
					<Button onClick={this.props.login} type="primary" htmlType="submit">
						Continue
					</Button>
				</Form.Item>
			</Form>
		);
	}
}

export default withRouter(RegisterPage);
