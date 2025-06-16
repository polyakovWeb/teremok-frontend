import "./UserProfile.css";
import { useAuth } from "../../components/AuthContext/AuthContext";
import ParentForm from "../../components/ParentForm/ParentForm";
import ChildForm from "../../components/ChildForm/ChildForm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserProfile() {
	const { user } = useAuth();
	const navigate = useNavigate();

	const [typeUserForm, setTypeUserForm] = useState("parent");
	const [modeChildForm, setModeChildForm] = useState("change");
	const [selectedChild, setSelectedChild] = useState({});

	// Для НЕ авторизованного пользователя - переадресация
	useEffect(() => {
		let timerId;
		if (user === null) {
			timerId = setTimeout(() => {
				navigate("/login");
			}, 3000);
		}
		return () => clearTimeout(timerId); // Очистка таймера при размонтировании компонента
	}, [navigate, user]);

	if (user === null) {
		return (
			<div>
				<h2 className="title">Вы не авторизованы! Переадресация...</h2>
			</div>
		);
	}

	// Переключение между отображаемыми формами
	let displayedForm;
	switch (typeUserForm) {
		case "parent":
			// Форма родителя
			displayedForm = (
				<ParentForm
					user={user}
					setTypeUserForm={setTypeUserForm}
					setModeChildForm={setModeChildForm}
					setSelectedChild={setSelectedChild}
					selectedChild={selectedChild}
				/>
			);
			break;
		case "child":
			// Форма ребёнка с модом (change - изменить данные, add - добавить ребёнка)
			displayedForm = (
				<ChildForm
					mode={modeChildForm}
					setTypeUserForm={setTypeUserForm}
					selectedChild={selectedChild}
				/>
			);
			break;
		default:
			break;
	}

	return <div className="profile-wrapper">{displayedForm}</div>;
}

export default UserProfile;
