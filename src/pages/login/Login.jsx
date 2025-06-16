import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	loginInitialValues,
	loginSchema,
} from "../../components/YupValidation/helpers";
import Input from "../../components/Input/Input";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContext/AuthContext";
import axios from "axios";
import { useEffect } from "react";

function Login() {
	const navigate = useNavigate();
	const { isAuth, login } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm({
		defaultValues: loginInitialValues,
		mode: "onChange",
		resolver: yupResolver(loginSchema),
	});

	// Для УЖЕ авторизованного пользователя - переадресация на главный экран с alert уведомлением
	useEffect(() => {
		let timerId;
		if (isAuth) {
			timerId = setTimeout(() => {
				navigate("/main");
			}, 3000);
		}
		return () => clearTimeout(timerId); // Очистка таймера при размонтировании компонента
	}, [navigate, isAuth]);

	if (isAuth) {
		return (
			<div>
				<h2 className="title">Вы уже авторизованы!</h2>
				<div className="message" style={{ textAlign: "center" }}>
					Переадресация через 3 секунды...
				</div>
			</div>
		);
	}

	// В дальнейшем
	const onSubmit = async (data) => {
		await axios
			.post("http://localhost:4444/login", data)
			.then((res) => {
				// Вытаскиваем user
				const user = res.data.user;
				// Вытаскиваем JWT
				const JWT = res.data.tokenJWT;
				// Выполнить login(user), которая передаст данные пользователя и сменит isAuth = true
				login(user);
				// Сохранить JWT в localStorage
				window.localStorage.setItem("Authorization", JWT);
				alert("Авторизация выполнена успешно. Добро пожаловать!");
				// Переадресация авторизовнного пользователя на главную страницу
				navigate("/main");
				// console.log(res.data);
			})
			.catch((axiosErr) => {
				alert("Во время авторизации произошла ошибка.", axiosErr);
				// Добавить поле для отображения ошибки?
				// Установить сообщение в поле ошибки при помощи React-Hook-Form
				setError("server", {
					message: "Не удалось получить корректный ответ от сервера",
				});
				console.log("Не удалось получить корректный ответ от сервера");
			});
	};

	return (
		<div className="form-wrapper">
			<div className="wrapper__content">
				<form className="login__form form" onSubmit={handleSubmit(onSubmit)}>
					<h1 className="form__title">Введите логин и пароль для входа</h1>
					<Input
						name="email"
						labelText="Логин (почта, которую указывали при регистрации)"
						placeholder="Введите почту"
						register={register}
						errors={errors}
					/>
					<Input
						name="password"
						labelText={"Пароль"}
						placeholder={"Введите пароль"}
						register={register}
						errors={errors}
						type={"password"}
					/>
					{/* Поле с условным рендером для отображения ошибки, если та возникает в процессе авторизации */}
					{errors.server && (
						<div style={{ color: "red", marginBottom: "10px" }}>
							<p>{errors.server.message}</p>
						</div>
					)}
					<button type="submit" className="form__button button-hovered">
						Войти
					</button>
				</form>
			</div>
			<div className="border"></div>
			<div className="wrapper__footer footer">
				<div className="footer__title">
					У вас еще нет своего профиля? Регистрируйтесь по кнопке ниже!
				</div>
				<Link to="/registr" className="footer__button button-hovered">
					Регистрация
				</Link>
			</div>
		</div>
	);
}

export default Login;
