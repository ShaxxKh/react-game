import React from "react";
import MyHeader from "./header/header";
import MyContent from "./content/content";
import MyFooter from "./footer/footer";
import { Layout } from "antd";
import Board from "../components/board";
import { Route, Switch } from "react-router";
const { Header, Footer, Content } = Layout;

export default function MyLayout({ children }) {
	console.log(children);
	return (
		<Layout>
			<MyHeader />
			<Content>{children}</Content>
			<MyFooter />
		</Layout>
	);
}
