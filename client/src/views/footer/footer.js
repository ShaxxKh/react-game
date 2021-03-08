import React from "react";
import "./footer.css";
import myPhoto from "../../assets/img/myPhoto.png";
import logo from "../../assets/img/rs-school-logo.svg";

export default class MyFooter extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="footer">
				<div className="developer" data-link="https://github.com/ShaxxKh">
					<img src={myPhoto} alt="avatar" className="developer--avatar" />
					<p className="developer--name">Shakhzod Khodjaev</p>
				</div>
				<div>
					<h2>
						March 2021
						<br />
						Tashkent
					</h2>
				</div>
				<div className="footer-logo">
					<a href="https://rs.school/js/" className="footer-link">
						<img src={logo} alt="rs-school" className="footer-logo--img" />
					</a>
				</div>
			</div>
		);
	}
}
