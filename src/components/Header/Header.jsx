import "./Header.css";
import darkLogoImg from "../../img/logo-dark.svg";
import logoutImg from "../../img/logout.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";

function Header() {
	// Получение информации об авторизации и пользователе из состояния приложения
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	// Обработчик кнопки выхода из аккаунта
	const handlerLogout = () => {
		if (
			window.confirm(
				"Вы уверены, что хотите выйти из аккаунта? После выхода потребуется повторная авторизация."
			)
		) {
			logout();
			navigate("/");
		}
	};

	return (
		<header>
			<div className="container">
				<ul className="nav">
					<li className="nav__item logo">
						<Link to="/main" title="На главную">
							<img src={darkLogoImg} alt="Logo" />
						</Link>
					</li>
					<li className="nav__item">
						<Link to="/instruction">Инструкция по тренажеру</Link>
					</li>
					<li className="nav__item">
						<Link to="/methodics">Методические указания</Link>
					</li>
					<li className="nav__item">
						<Link to="/trainer">Тренажер</Link>
					</li>
					{/* Условный рендер навигации для авторизованных пользователей */}
					{user ? (
						<>
							<li className="nav__item user">
								<Link to="/user" title="Личный кабинет">
									{`${user.firstName} ${user.lastName}`}
								</Link>
							</li>
							<li className="nav__item logout" onClick={handlerLogout}>
								<Link to="/" title="Выйти из аккаунта">
									<img src={logoutImg} alt="Logout" />
								</Link>
							</li>
						</>
					) : (
						<li className="nav__item user">
							<Link to="/login" title="Войти в личный кабинет">
								Войти
							</Link>
						</li>
					)}
				</ul>
			</div>
		</header>
	);
}

export default Header;
