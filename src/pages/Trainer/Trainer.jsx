import './Trainer.scss';
import { useAuth } from '../../components/AuthContext/AuthContext.js';
import { useState } from 'react';
import TrainerInit from '../../components/TrainerInit/TrainerInit.jsx';
import TrainerTask from '../../components/TrainerTask/TrainerTask.jsx';
import CardSelection from '../../components/CardSelection/CardSelection.jsx';
import card1 from '../../img/card1.jpg';
import card2 from '../../img/card2.jpg';
import card3 from '../../img/card3.jpg';
import card4 from '../../img/card4.jpg';
import card5 from '../../img/card5.jpg';
import Task from '../../components/Task/Task.jsx';
import CardGreeting from '../../components/CardGreeting/CardGreeting.jsx';
import Cartoon from '../../components/Cartoon/Cartoon.jsx';
import Distraction from '../../components/Distraction/Distraction.jsx';

// Массив карточек на выбор
const cardsImgs = [
	{ id: 1, src: card1, alt: 'Card 1' },
	{ id: 2, src: card2, alt: 'Card 2' },
	{ id: 3, src: card3, alt: 'Card 3' },
	{ id: 4, src: card4, alt: 'Card 4' },
	{ id: 5, src: card5, alt: 'Card 5' },
];

// Массив заданий
const tasksList = [
	{
		type: 'Сложение',
		variants: [
			{ firstNum: 1, secondNum: null, result: 4, help: [1, 3, 4] },
			{ firstNum: 2, secondNum: 3, result: null, help: [2, 3, 5] },
			{ firstNum: 4, secondNum: null, result: 6, help: [4, 2, 6] },
			{ firstNum: null, secondNum: 3, result: 4, help: [1, 3, 4] },
			{ firstNum: 6, secondNum: 2, result: null, help: [6, 2, 8] },
		],
	},
	{
		type: 'Вычитание',
		variants: [
			{ firstNum: 4, secondNum: null, result: 3, help: [4, 1, 3] },
			{ firstNum: 6, secondNum: 2, result: null, help: [6, 2, 4] },
			{ firstNum: null, secondNum: 3, result: 2, help: [5, 3, 2] },
			{ firstNum: 4, secondNum: 2, result: null, help: [4, 2, 2] },
			{ firstNum: null, secondNum: 3, result: 3, help: [6, 3, 3] },
		],
	},
	{
		type: 'Порядковый счёт',
		variants: [],
	},
	{
		type: 'Состав числа',
		variants: [],
	},
];

function Trainer() {
	// Отображаемый компонент
	const [activeComponent, setActiveComponent] = useState('TrainerInit');
	// Объект с информацией о ребёнке
	const [selectedChild, setSelectedChild] = useState(null);
	// Выбранный тип задачи "Сложение" = 0/"Вычитание" = 1/"Порядковый счёт" = 2/"Состав числа" = 3
	const [selectedTypeTask, setSelectedTaskType] = useState(null);
	// Выбранные карточки
	const [selectedCards, setSelectedCards] = useState([-1, -1, -1, -1, -1]);
	// Текущая итерация из банка мат.выражений (от 0 до 4)
	const [iteration, setIteration] = useState(0);

	const { user } = useAuth();

	// Переключатель между компонентами
	let displayedComponent;
	switch (activeComponent) {
		// Выбор ребёнка для прохождения тренажёра
		case 'TrainerInit':
			displayedComponent = (
				<TrainerInit
					setActiveComponent={setActiveComponent}
					user={user}
					setSelectedChild={setSelectedChild}
				/>
			);
			break;
		// Выбор необходимого типа задачи
		case 'TrainerTask':
			displayedComponent = (
				<TrainerTask
					setActiveComponent={setActiveComponent}
					setSelectedTaskType={setSelectedTaskType}
				/>
			);
			break;
		// Выбор стимулов (карточек)
		case 'CardSelection':
			displayedComponent = (
				<CardSelection
					cardsImgs={cardsImgs}
					setActiveComponent={setActiveComponent}
					selectedCards={selectedCards}
					setSelectedCards={setSelectedCards}
				/>
			);
			break;
		// Задачи
		case 'Task':
			displayedComponent = (
				<Task
					// функция, которая вызывается с аргументом типа задания: getExpressions(0 / 1), 0 - сложение, 1 - вычитание
					// на каждой итерации =>
					// 	случайно выбирать неизвестное число = null: firstNumber, secondNumber, result
					// 	генерировать остальные два числа случайным образом
					// 	генерировать банк подсказки
					// 	возвращать выражение в виде объекта
					mathExpressions={tasksList[selectedTypeTask]}
					iteration={iteration}
					setIteration={setIteration}
					setActiveComponent={setActiveComponent}
				/>
			);
			break;
		// Таймер-отвлечение после ошибки (хлопаем в ладоши)
		case 'Distraction':
			displayedComponent = (
				<Distraction setActiveComponent={setActiveComponent} />
			);
			break;
		// Награждение карточкой за успешно решённую задачу
		case 'CardGreeting':
			displayedComponent = (
				<CardGreeting
					name={selectedChild.firstName}
					iteration={iteration}
					card={cardsImgs[selectedCards[iteration - 1]]}
					setActiveComponent={setActiveComponent}
				/>
			);
			break;
		// Показ мультика после цикла задач
		case 'Cartoon':
			const cards = selectedCards.map((number) => cardsImgs[number], []);
			displayedComponent = <Cartoon cards={cards} />;
			break;
		default:
			displayedComponent = (
				<div className=''>
					Взаимодействие недоступно. Произошла непредвиденная ошибка...
				</div>
			);
			break;
	}
	// Отображение активного компонента
	return <>{displayedComponent}</>;
}

export default Trainer;
