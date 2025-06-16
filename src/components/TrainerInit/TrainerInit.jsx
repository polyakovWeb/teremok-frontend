import ChildList from "../ChildList/ChildList.jsx";

function TrainerInit({ user, setActiveComponent, setSelectedChild }) {
	// Логика доступности кнопки перехода далее
	const isAvailable = user ? (user.childrens.length > 0 ? true : false) : false;
	// Логика выбора ребёнка
	const sendSelectedChildNumber = () => {
		const selectChildrenElem = document.getElementById("children-list");
		const childId = [selectChildrenElem.value]; //номер выбранного ребёнка в списке
		setSelectedChild(user.childrens[childId]); //устанавливаем объект выбранного ребёнка в состояние для дальнейшей работы с ним
	};

	return (
		<div className="trainer-init">
			<h1 className="trainer-init__title">
				Из выпадающего списка выберите ребёнка, который в последующем будет
				выполнять задания
			</h1>
			<ChildList />
			{isAvailable ? (
				<button
					className="init-button"
					onClick={() => {
						setActiveComponent("TrainerTask");
						sendSelectedChildNumber();
					}}
				>
					Продолжить
				</button>
			) : (
				<>
					<button className="init-button disabled" disabled>
						Невозможно продолжить
					</button>
					<p className="info">Зарегистрировать ребёнка можно в личном кабинете!</p>
				</>
			)}
		</div>
	);
}

export default TrainerInit;
