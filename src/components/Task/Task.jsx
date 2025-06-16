import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import TaskInput from '../TaskInput/TaskInput';
import appleImg from '../../img/apple.svg';

function Task({
	mathExpressions,
	setIteration,
	iteration,
	setActiveComponent,
}) {
	// Текущее мат.выражение из банка
	const [currentExpression, setCurrentExpression] = useState(
		mathExpressions.variants[iteration]
	);

	// Функция перехода к следующей задаче цикла (итерация + 1, обновление текущей задачи, сброс попыток)

	// Попытка решения задачи
	// 0 - первая попытка без подсказок
	// 1 - вторая попытка с первой подсказкой
	// 2 - третья попытка с первой и второй подсказкой (пока не решит правильно)
	const [tryCount, setTryCount] = useState(0);

	const { register, handleSubmit, reset } = useForm({
		mode: 'onSubmit',
		defaultValues: currentExpression,
	});

	// Обновляем форму при изменении currentExpression
	useEffect(() => {
		reset(currentExpression); // Сбрасываем форму с новыми значениями по умолчанию
	}, [currentExpression, reset]);

	// Настройка отображения контента на странице в зависимости от типа задачи
	let taskInfo;
	let operand_1;
	const selectedTypeTask = mathExpressions.type;
	switch (selectedTypeTask) {
		case 'Сложение':
			operand_1 = '+';
			taskInfo = `Впиши недостающую цифру вместо "?" так, чтобы  результат сложения слева был равен цифре справа`;
			break;
		case 'Вычитание':
			operand_1 = '-';
			taskInfo = `Впиши недостающую цифру вместо "?" так, чтобы  результат вычитания слева был равен цифре справа`;
			break;
		case 'Порядковый счет':
			taskInfo = 'Описание действия в задачах на порядковый счёт';
			break;
		case 'Состав числа':
			taskInfo = 'Описание действия в задачах на состав числа';
			break;

		default:
			break;
	}

	// Функция проверки результата
	const checkingTask = (data) => {
		// Инициализация введённых данных в переменные
		const firstNum = Number(data.firstNum);
		const secondNum = Number(data.secondNum);
		const result = Number(data.result);

		// Блок проверки правильности результата
		let userResult, isEqual;
		switch (selectedTypeTask) {
			case 'Сложение':
				userResult = firstNum + secondNum;
				isEqual = userResult === result;
				break;
			case 'Вычитание':
				userResult = firstNum - secondNum;
				isEqual = userResult === result;
				break;
			case 'Порядковый счет':
				// Дано: [1,6,8,2,5] / "16825"
				// Программно сортировать строку
				// Полученный образец: [1,2,5,6,8] / "12568"
				// Сравнивать образец с полученным результатом
				// Получено 1: [1,2,6,5,8] / "12658" === образ."12568" - false
				// Получено 2: [1,2,5,6,8] / "12568" === образ."12568" - true
				break;
			case 'Состав числа':
				// В чём заключается смысл задания?
				break;
			default:
				break;
		}
		// Реализация логики с подсказками в зависимости от флага и попыток
		// Обновление попыток и рендер в зависимости от текущей попытки
		if (isEqual) {
			// Если правильно решено с 1-ой попытки, то - награда + следующее задание
			if (tryCount === 0) {
				setIteration(iteration + 1);
				setActiveComponent('CardGreeting');
				if (iteration !== mathExpressions.variants.length - 1) {
					// Переход к следующей задаче (обновление данных задачи)
					setCurrentExpression(mathExpressions.variants[iteration + 1]);
				}
			} else {
				setTryCount(0);
				reset();
				setActiveComponent('Distraction');
			}
		} else {
			reset();
			// Переключение попыток
			switch (tryCount) {
				case 0:
					setTryCount(tryCount + 1);
					break;
				case 1:
					setTryCount(tryCount + 1);
					break;
				default:
					break;
			}
		}
	};

	// Отрисовка переданного количества яблок при подсказке
	const addAppleImgs = (count) => {
		return Array(count)
			.fill(null)
			.map((_, index) => (
				<img
					src={appleImg}
					alt='Подсказка'
					className='helpImg'
					key={index}
					width='45px'
				/>
			));
	};

	// Корректное отображение слова "яблоко"
	const correctWord = (count) => {
		if (count === 1) return 'яблоко';
		if (count > 1 && count < 5) return 'яблока';
		if (count === 0 || (count > 4 && count < 10)) return 'яблок';
	};

	return (
		<div className='task'>
			{tryCount > 0 ? (
				<>
					<h1 className='title'>Ой, что-то не так!</h1>
					<p className='info'>
						Была допущена ошибка. Посмотри на подсказку и попробуй
						выполнить задание снова
					</p>
				</>
			) : (
				<>
					<h1 className='title'>{selectedTypeTask}</h1>
					<p className='info'>{taskInfo}</p>
				</>
			)}
			<div className='task-wrapper'>
				<form
					className='task-container'
					onSubmit={handleSubmit(checkingTask)}
				>
					{/* Блок подсказок */}
					{tryCount > 0 && (
						<>
							<div className='help'>
								<div className='first-number helper'>
									<div className='imgs-container'>
										{addAppleImgs(currentExpression.help[0])}
									</div>
									<p className='imgs-count'>
										{tryCount > 1 &&
											`${currentExpression.help[0]} ${correctWord(
												currentExpression.help[0]
											)}`}
									</p>
								</div>

								<div className='operation operand-1'>{operand_1}</div>
								<div className='second-number helper'>
									<div className='imgs-container'>
										{addAppleImgs(currentExpression.help[1])}
									</div>
									<p className='imgs-count'>
										{tryCount > 1 &&
											`${currentExpression.help[1]} ${correctWord(
												currentExpression.help[1]
											)}`}
									</p>
								</div>
								<div className='operation operand-2'>=</div>
								<div className='result helper'>
									<div className='imgs-container'>
										{addAppleImgs(currentExpression.help[2])}
									</div>
									<p className='imgs-count'>
										{tryCount > 1 &&
											`${currentExpression.help[2]} ${correctWord(
												currentExpression.help[2]
											)}`}
									</p>
								</div>
							</div>
						</>
					)}

					<div className='task-content'>
						{selectedTypeTask === 'Сложение' ||
						selectedTypeTask === 'Вычитание' ? (
							<>
								{/* Разметка для вычитания/сложения */}
								{/* 1 число */}
								<TaskInput
									className='number number-1'
									name='firstNum'
									type='number'
									register={register}
									min={0}
									max={9}
									curTask={currentExpression}
								/>
								{/* знак + или - */}
								<div className='operation operand-1'>{operand_1}</div>
								{/* 2 число */}
								<TaskInput
									className='number number-2'
									name='secondNum'
									type='number'
									register={register}
									min={0}
									max={9}
									curTask={currentExpression}
								/>
								{/* знак = */}
								<div className='operation operand-2'>=</div>
								{/* 3 число - результат действия */}
								<TaskInput
									className='number number-3'
									name='result'
									type='number'
									register={register}
									min={0}
									max={9}
									curTask={currentExpression}
								/>
							</>
						) : (
							<>
								<div className=''>
									"Разметка состав числа/порядковый счёт"
								</div>
							</>
						)}
					</div>
					<div className='task-footer'>
						<button type='submit' className='button-common button'>
							Проверить
						</button>
						<p className='task-number'>Задание №{iteration + 1}</p>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Task;
