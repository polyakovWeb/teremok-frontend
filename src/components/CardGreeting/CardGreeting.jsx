function CardGreeting({ name, iteration, card, setActiveComponent }) {
	let cardNumber;
	switch (iteration - 1) {
		case 0:
			cardNumber = "первую";
			break;
		case 1:
			cardNumber = "вторую";
			break;
		case 2:
			cardNumber = "третью";
			break;
		case 3:
			cardNumber = "четвёртую";
			break;
		case 4:
			cardNumber = "пятую";
			break;

		default:
			break;
	}
	return (
		<div className="card-greeting">
			<h1 className="title">
				Молодец, задание решено верно! <br />
				{name}, держи {cardNumber} карточку
			</h1>
			<div className="card-greeting-wrapper">
				<div className="card-container">
					<img className="card-img" src={card.src} alt={card.alt} />
				</div>
				<button
					className="button-common next"
					onClick={() => {
						iteration === 5
							? setActiveComponent("Cartoon")
							: setActiveComponent("Task");
					}}
				>
					Продолжить
				</button>
			</div>
		</div>
	);
}

export default CardGreeting;
