import { useAuth } from "../AuthContext/AuthContext";

function ChildList() {
	const { user } = useAuth();
	const childrens = user ? user.childrens : [];

	return (
		<>
			{/* Если есть хоть 1 ребёнок - выпадающий список, иначе - список выключен */}
			{childrens.length > 0 ? (
				<select
					className="children-list"
					id="children-list"
					defaultValue={childrens[0]}
				>
					{/* В объекте пользователя обращаемся к массиву детей */}
					{childrens.map((elem, index) => {
						return (
							<option
								key={index}
								value={index}
							>{`${elem.lastName} ${elem.firstName} ${elem.patronymic}`}</option>
						);
					})}
				</select>
			) : (
				<select className="children-list" id="children-list" disabled>
					<option>Нет зарегистрированных детей</option>
				</select>
			)}
		</>
	);
}

export default ChildList;
