import { wordsArr } from '../wordsArray';

function Distraction({ setActiveComponent }) {
	const getRandomWordsString = (wordsArr, wordsCount) => {
		if (wordsCount >= wordsArr.length) {
			console.error('Переданное число больше длины массива слов');
		} else {
			const words = [];
			while (words.length < wordsCount) {
				const randNum = Math.floor(Math.random() * wordsArr.length);
				const randItem = wordsArr[randNum];
				if (randItem !== undefined && !words.includes(randItem)) {
					words.push(randItem);
				}
			}
			const outString =
				words[0].charAt(0).toUpperCase() + words.join(', ').slice(1);

			return outString;
		}
	};

	return (
		<div className='distraction'>
			<h1 className='title'>
				Молодец, ты решил задание, но с подсказкой. <br />
				Давай прочтём слова, написанные ниже, а затем решим эту же задачу
				заново!
			</h1>
			<div className='wrapper'>
				<p className={`words`}>{getRandomWordsString(wordsArr, 3)}</p>
			</div>
			<button
				className='button-common button-distraction'
				onClick={() => setActiveComponent('Task')}
			>
				Продолжить
			</button>
		</div>
	);
}

export default Distraction;
