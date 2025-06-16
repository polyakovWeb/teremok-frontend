import { useState } from "react";
import cleverBckgrnd from "../../img/clever.svg";

function TrainerTask({ setActiveComponent, setSelectedTaskType }) {
	// Сделан ли выбор типа задания
	const [isChecked, setIsChecked] = useState(false);

	// Сохранение выбранного типа задания
	const getSelectedType = () => {
		const radioBtns = document.querySelectorAll(".task-radiobutton");
		for (const element of radioBtns) {
			if (element.checked) {
				setSelectedTaskType(element.id);
				return;
			}
		}
	};
	return (
		<div className="trainer-task">
			<h1 className="title">Выберите необходимый тип задачи</h1>
			<ul className="task-list">
				<li className="task-wrapper">
					<input
						className="task-radiobutton"
						type="radio"
						name="task-type"
						id="0"
						value={"Сложение"}
						onClick={() => setIsChecked(true)}
					/>
					<div className="task-item">
						<label htmlFor="0" className="task-label">
							<p
								className="task-name"
								style={{ backgroundImage: `url(${cleverBckgrnd})` }}
							>
								Сложение
							</p>
						</label>
					</div>
				</li>
				<li className="task-wrapper">
					<input
						className="task-radiobutton"
						type="radio"
						name="task-type"
						id="1"
						value={"Вычитание"}
						onClick={() => setIsChecked(true)}
					/>
					<div className="task-item">
						<label htmlFor="1" className="task-label">
							<p
								className="task-name"
								style={{ backgroundImage: `url(${cleverBckgrnd})` }}
							>
								Вычитание
							</p>
						</label>
					</div>
				</li>
				{/* Функционал для ВКР */}
				{/* <li className="task-wrapper">
					<input
						className="task-radiobutton"
						type="radio"
						name="task-type"
						id="2"
						value={"Порядковый счёт"}
						onClick={() => setIsChecked(true)}
					/>
					<div className="task-item">
						<label htmlFor="2" className="task-label">
							<p
								className="task-name"
								style={{ backgroundImage: `url(${cleverBckgrnd})` }}
							>
								Порядковый счёт
							</p>
						</label>
					</div>
				</li>
				<li className="task-wrapper">
					<input
						className="task-radiobutton"
						type="radio"
						name="task-type"
						id="3"
						value={"Состав числа"}
						onClick={() => setIsChecked(true)}
					/>
					<div className="task-item">
						<label htmlFor="3" className="task-label">
							<p
								className="task-name"
								style={{ backgroundImage: `url(${cleverBckgrnd})` }}
							>
								Состав числа
							</p>
						</label>
					</div>
				</li> */}
			</ul>
			<p className="info">
				<span className="selected">Важно!</span> После нажатия кнопки "Начать" будет
				предложен выбор стимулов. Позвольте{" "}
				<span className="selected">ребёнку</span> сделать этот выбор. <br />
				Затем пусть он <span className="selected">самостоятельно</span> попытается
				пройти цикл безошибочного обучения.
				<br /> Больше информации вы можете прочитать в разделах{" "}
				<span className="selected">"Методические указания"</span> и{" "}
				<span className="selected">"Инструкция по тренажёру"</span>
			</p>
			<div className="buttons-wrapper">
				<button
					className="back-button"
					onClick={() => {
						setActiveComponent("TrainerInit");
					}}
				>
					Назад
				</button>
				<button
					className="start-button"
					disabled={!isChecked}
					onClick={() => {
						getSelectedType();
						setActiveComponent("CardSelection");
					}}
				>
					Начать
				</button>
			</div>
		</div>
	);
}

export default TrainerTask;
