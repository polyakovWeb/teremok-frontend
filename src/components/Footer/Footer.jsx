import { Link } from "react-router-dom";
import lightLogoImg from "../../img/logo-light.svg";
import "./Footer.css";

function Footer() {
	const curYear = new Date().getFullYear();
	return (
		<footer>
			<div className="container">
				<Link className="logo" to="/main" title="На главную">
					<img src={lightLogoImg} alt="Logo" />
				</Link>
				<p className="copyright">Teremok - web trainer © {curYear}</p>
			</div>
		</footer>
	);
}

export default Footer;
