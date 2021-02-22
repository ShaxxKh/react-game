import React from 'react';
import { Form, Input, Button } from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class RegisterPage extends React.Component {
	constructor(props){
		super(props);
		let username = null;
		username = localStorage.getItem('tic-tac-toe-username');
		console.log(username)
		if(username !== null) {
			this.props.history.push('/main')
		}
	};
	onFinish = (values) => {
	localStorage.setItem('tic-tac-toe-username', values.username);
	this.props.history.push('/main')
    console.log('Success:', values);
  	};

  	onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  	};
  	render(){
		return (
		<Form
		  {...layout}
		  name="basic"
		  initialValues={{
			remember: true,
		  }}
		  onFinish={this.onFinish}
		  onFinishFailed={this.onFinishFailed}
		>
		  <Form.Item
			label="Username"
			name="username"
			rules={[
			  {
				required: true,
				message: 'Please input your username!',
			  },
			]}
		  >
			<Input />
		  </Form.Item>
	
		  <Form.Item {...tailLayout}>
			<Button type="primary" htmlType="submit">
			  Continue
			</Button>
		  </Form.Item>
		</Form>
	  );
  }
  
};

export default RegisterPage;