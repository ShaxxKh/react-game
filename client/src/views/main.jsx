import React from 'react'

export default class MainPage extends React.Component {
	constructor(props){
		super(props)
		this.username = localStorage.getItem('tic-tac-toe-username');
	}
	render(){
		return <h1>Hello {this.username}</h1>
	}
}