import ProfileField from "../ProfileField/ProfileField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { childSchema } from "../YupValidation/helpers";
import axios from "axios";
import { useAuth } from "../AuthContext/AuthContext";

function ChildForm({ mode, setTypeUserForm, selectedChild }) {
	// Для компонентов профиля ребёнка и родителя понадобатся useForm
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: mode === "change" ? selectedChild : {},
		mode: "onChange",
		resolver: yupResolver(childSchema),
	});

	const { setIsLoading, setUser } = useAuth();

	const onSubmit = async (childInfoData) => {
		if (window.confirm("Уверены, что хотите сохранить изменения?")) {
			// Сервер ожидает:
			// "firstName": "Анастасися",
			// "lastName": "Петровна",
			// "patronymic": "Хренова",
			// "childId": "67b3481448e136c6bac61b4f"

			// Собирается инфа и отправляется на сервер post запросом об обновлении записи
			const { firstName, lastName, patronymic, _id: childId } = childInfoData;
			const changedChild = { firstName, lastName, patronymic, childId };
			setIsLoading(true);
			const statistic = {
				cards: {
					count: 0,
					types: [
						{
							id: 0,
							collected: 0,
						},
						{
							id: 1,
							collected: 0,
						},
						{
							id: 2,
							collected: 0,
						},
						{
							id: 3,
							collected: 0,
						},
						{
							id: 4,
							collected: 0,
						},
					],
				},
			};

			// Не работает из-за того, что в req.headers.Authorization не передаётся JWT
			mode === "change"
				? await axios
						.patch("http://localhost:4444/changeChildInfo", changedChild, {
							headers: {
								Authorization: window.localStorage.getItem("Authorization"),
							},
						})
						.then((req) => {
							if (req.statusText === "OK") {
								alert("Данные успешно сохранены!");
								setTypeUserForm("parent");
								console.log(req);
							} else alert("Не удалось сохранить данные");
						})
						.catch((err) => {
							console.error(err);
							alert("Во время сохранения изменений возникла ошибка");
						})
						.finally(() => {
							setIsLoading(false);
							setUser(null);
						})
				: await axios
						.post(
							"http://localhost:4444/addChild",
							{
								...changedChild,
								statistic,
							},
							{
								headers: {
									Authorization: window.localStorage.getItem("Authorization"),
								},
							}
						)
						.then((req) => {
							if (req.statusText === "OK") {
								alert("Запись о ребёнке успешно зарегистрирована!");
								setTypeUserForm("parent");
							} else alert("Не удалось зарегистрирова запись ребёнка");
						})
						.catch((err) => {
							console.error(err);
							alert("Во время регистрации ребёнка возникла ошибка");
						})
						.finally(() => {
							setIsLoading(false);
							setUser(null);
						});
		}
	};

	const deleteSelectedChild = async () => {
		if (
			window.confirm(
				"Уверены, что хотите безвозвратно удалить запись о данном ребёнке?"
			)
		) {
			setIsLoading(true);
			await axios
				.delete(
					`http://localhost:4444/deleteChild/${selectedChild._id}/${selectedChild.parentId}`,
					{
						headers: {
							Authorization: window.localStorage.getItem("Authorization"),
						},
					}
				)
				.then((res) => {
					if (res.statusText === "OK") {
						alert("Данные ребёнка успешно удалены!");
						setUser(null);
						setTypeUserForm("parent");
					} else alert("Не удалось удалить данные");
				})
				.catch((err) => {
					console.error(err);
					alert("Во время удаления данных возникла ошибка");
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	};

	switch (mode) {
		case "change":
			return (
				// Изменение профиля ребёнка
				<>
					<h1 className="title profile-wrapper__title">Изменение профиля ребенка</h1>
					<form className="user-info change-child" onSubmit={handleSubmit(onSubmit)}>
						{/* Фамилия */}
						<ProfileField
							name={"lastName"}
							labelText={"Фамилия"}
							placeholder={"Фамилия"}
							type={"text"}
							// value={user.lastName} заменяется на initialValue
							register={register}
							errors={errors}
						/>
						{/* Имя */}
						<ProfileField
							name={"firstName"}
							labelText={"Имя"}
							placeholder={"Имя"}
							type={"text"}
							// value={user.lastName} заменяется на initialValue
							register={register}
							errors={errors}
						/>
						{/* Отчество */}
						<ProfileField
							name={"patronymic"}
							labelText={"Отчество"}
							placeholder={"Отчество"}
							type={"text"}
							// value={user.lastName} заменяется на initialValue
							register={register}
							errors={errors}
						/>
						<div className="child-buttons">
							<button
								type="button"
								className="profile-button back"
								onClick={() => setTypeUserForm("parent")}
							>
								Назад
							</button>
							<button type="submit" className="profile-button add-child">
								Сохранить изменения
							</button>
							<button
								type="button"
								className="profile-button delete-child"
								onClick={() => deleteSelectedChild()}
							>
								Удалить профиль
							</button>
						</div>
					</form>
				</>
			);
		case "add":
			return (
				// Создание профиля ребёнка
				<>
					<h1 className="title profile-wrapper__title">Создание профиля ребенка</h1>
					<form className="user-info create-child" onSubmit={handleSubmit(onSubmit)}>
						{/* Фамилия */}
						<ProfileField
							name={"lastName"}
							labelText={"Фамилия"}
							placeholder={"Фамилия"}
							type={"text"}
							// value={user.lastName} заменяется на initialValue
							register={register}
							errors={errors}
						/>
						{/* Имя */}
						<ProfileField
							name={"firstName"}
							labelText={"Имя"}
							placeholder={"Имя"}
							type={"text"}
							// value={user.lastName} заменяется на initialValue
							register={register}
							errors={errors}
						/>
						{/* Отчество */}
						<ProfileField
							name={"patronymic"}
							labelText={"Отчество"}
							placeholder={"Отчество"}
							type={"text"}
							// value={user.lastName} заменяется на initialValue
							register={register}
							errors={errors}
						/>
						<button
							type="button"
							className="profile-button back"
							onClick={() => setTypeUserForm("parent")}
						>
							Назад
						</button>
						<button type="submit" className="profile-button add-child">
							Создать профиль ребёнка
						</button>
					</form>
				</>
			);
		default:
			break;
	}
}

export default ChildForm;
