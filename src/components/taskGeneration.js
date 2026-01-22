function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min; // [min, max)
}

// Сложение
function generateAdditionVariant() {
	// Варианты: firstNum=null, secondNum=null, result=null
	const variantType = getRandomInt(1, 3);
	let firstNum, secondNum, result;

	switch (variantType) {
		case 1: // firstNum = null
			firstNum = null;
			secondNum = getRandomInt(0, 10);
			secondNum === 0
				? (result = getRandomInt(secondNum + 1, 10))
				: (result = getRandomInt(secondNum, 10));
			break;
		case 2: // secondNum = null
			firstNum = getRandomInt(0, 9);
			secondNum = null;
			firstNum === 0
				? (result = getRandomInt(firstNum + 1, 10))
				: (result = getRandomInt(firstNum, 10));
			break;
		case 3: // result = null
			firstNum = getRandomInt(0, 9);
			firstNum === 0
				? (secondNum = getRandomInt(1, 10 - firstNum))
				: (secondNum = getRandomInt(0, 10 - firstNum));
			result = null;
			break;
		default:
			console.error('Ошибка');
			break;
	}

	const help = [
		firstNum === null ? result - secondNum : firstNum,
		secondNum === null ? result - firstNum : secondNum,
		result === null ? firstNum + secondNum : result,
	];

	return { firstNum, secondNum, result, help };
}

// Вычитание
function generateSubtractionVariant() {
	// Варианты: firstNum=null, secondNum=null, result=null
	const variantType = getRandomInt(1, 3);
	let firstNum, secondNum, result;

	switch (variantType) {
		case 1: // firstNum = null
			firstNum = null;
			result = getRandomInt(1, 10);
			result === 9
				? (secondNum = getRandomInt(0, 10 - result))
				: (secondNum = getRandomInt(1, 10 - result));
			break;
		case 2: // secondNum = null
			secondNum = null;
			firstNum = getRandomInt(1, 10);
			result = getRandomInt(0, firstNum + 1);
			break;
		case 3: // result = null
			firstNum = getRandomInt(1, 10);
			secondNum = getRandomInt(0, firstNum + 1);
			result = null;
			break;
		default:
			console.error('Ошибка');
			break;
	}

	const help = [
		firstNum === null ? result + secondNum : firstNum,
		secondNum === null ? firstNum - result : secondNum,
		result === null ? firstNum - secondNum : result,
	];

	return { firstNum, secondNum, result, help };
}

export function generateExpressions(selectedTypeTask) {
	const taskList = { type: '', variants: [] };
	switch (selectedTypeTask) {
		case '0':
			taskList.type = 'Сложение';
			for (let i = 0; i < 5; i++)
				taskList.variants.push(generateAdditionVariant());
			break;
		case '1':
			taskList.type = 'Вычитание';
			for (let i = 0; i < 5; i++)
				taskList.variants.push(generateSubtractionVariant());
			break;
		default:
			console.error('Ошибка генерации');
			break;
	}
	// console.log(taskList);
	return taskList;
}

// Массив заданий
export const tasksList = [
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
