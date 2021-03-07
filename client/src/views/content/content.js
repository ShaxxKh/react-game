import React from 'react';
import Board from '../../components/board';
import { Route, Switch } from "react-router";
import "./content.css";

export default function MyContent() {

		return <Switch>
			<Route path="/2players" component={Board}/>
		</Switch> 
			
};