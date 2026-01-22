import { useState } from 'react';

function CardSelection({
	cardsImgs,
	setActiveComponent,
	selectedCards,
	setSelectedCards,
}) {
	const [iteration, setIteration] = useState(0);

	const isCardSelected = () => {
		const selectedCard = document.querySelector('.cards-item.selected');
		if (selectedCard) {
			return true;
		} else {
			alert('Вы не выбрали карточку!');
			return false;
		}
	};

	return (
		<div className='card-selection'>
			<h1 className='title'>
				Выбери понравившуюся карточку и нажми "Продолжить"{' '}
			</h1>
			<div className='cards-wrapper'>
				<ul className='cards-list'>
					{cardsImgs
						.slice(iteration * 5, (iteration + 1) * 5)
						.map((img) => {
							return (
								<li
									className={`cards-item ${
										img.id - 1 === selectedCards[iteration]
											? `selected`
											: ''
									}`}
									key={img.id}
									onClick={() => {
										const newState = [...selectedCards];
										newState[iteration] = img.id - 1;
										setSelectedCards(newState);
									}}
								>
									<img
										className='cards-img'
										src={img.src}
										alt={img.alt}
									/>
								</li>
							);
						})}
				</ul>
				{/* <p>Выбранная карточка (номер в массиве): {selectedCards[0]}</p> */}
				{/* <p>Имя: {cardsImgs[selectedCards[0]].alt}</p> */}
				<div className='cards-actions'>
					<div className='buttons-container'>
						<button
							className='button-common'
							onClick={() => {
								if (iteration === 0) {
									setActiveComponent('TrainerTask');
								} else {
									setIteration(iteration - 1);
								}
							}}
						>
							Назад
						</button>
						<button
							className='button-common next'
							onClick={() => {
								if (isCardSelected()) {
									iteration === 4
										? setActiveComponent('Task')
										: setIteration(iteration + 1);
								}
							}}
						>
							{iteration !== 4 ? 'Продолжить' : 'Начать решение задачи'}
						</button>
					</div>
					<p className='iteration'>{iteration + 1}/5</p>
				</div>
			</div>
		</div>
	);
}

export default CardSelection;
