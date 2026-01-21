import './Trainer.scss';
import { useAuth } from '../../components/AuthContext/AuthContext.js';
import { useEffect, useState } from 'react';
import TrainerInit from '../../components/TrainerInit/TrainerInit.jsx';
import TrainerTask from '../../components/TrainerTask/TrainerTask.jsx';
import CardSelection from '../../components/CardSelection/CardSelection.jsx';
import Task from '../../components/Task/Task.jsx';
import CardGreeting from '../../components/CardGreeting/CardGreeting.jsx';
import Cartoon from '../../components/Cartoon/Cartoon.jsx';
import Distraction from '../../components/Distraction/Distraction.jsx';
import { cardsImgs } from '../../components/cardsArray.js';
import { generateExpressions } from '../../components/taskGeneration.js';

function Trainer() {
	// Отображаемый компонент
	const [activeComponent, setActiveComponent] = useState('TrainerInit');
	// Объект с информацией о ребёнке
	const [selectedChild, setSelectedChild] = useState(null);
	// Выбранный тип задачи "Сложение" = 0/"Вычитание" = 1/"Порядковый счёт" = 2/"Состав числа" = 3
	const [selectedTypeTask, setSelectedTaskType] = useState(null);
	// Банк выражений
	const [mathExpressions, setMathExpressions] = useState(null);
	// Выбранные карточки
	const [selectedCards, setSelectedCards] = useState([-1, -1, -1, -1, -1]);
	// Текущая итерация из банка мат.выражений (от 0 до 4)
	const [iteration, setIteration] = useState(0);

	const { user } = useAuth();

	useEffect(() => {
		if (selectedTypeTask !== null)
			setMathExpressions(generateExpressions(selectedTypeTask));
	}, [selectedTypeTask]);

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
					// mathExpressions={tasksList[selectedTypeTask]}
					mathExpressions={mathExpressions}
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
