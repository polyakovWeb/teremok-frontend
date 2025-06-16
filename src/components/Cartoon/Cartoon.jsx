import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function Cartoon({ cards }) {
	const iframeContainer = useRef(null);

	useEffect(() => {
		const iframe = document.createElement("iframe");
		iframe.title = "cartoon";
		iframe.width = "720";
		iframe.height = "405";
		iframe.src = "https://rutube.ru/play/embed/209a7be0fe1554e0fcebade063b1ae05/";
		iframe.allow = "clipboard-write; autoplay";
		iframe.webkitAllowFullScreen = true;
		iframe.mozallowfullscreen = true;
		iframe.allowFullScreen = true;

		const container = iframeContainer.current;
		if (container) {
			container.appendChild(iframe);
		}

		return () => {
			if (container && container.contains(iframe)) {
				container.removeChild(iframe);
			}
		};
	}, []);
	return (
		<div className="cartoon">
			<div className="title">Поздравляю!</div>
			<div className="cartoon-wrapper">
				<p className="info">
					Ты успешно выполнил все задания и собрал желаемые карточки:
				</p>
				<ul className="card-list">
					{cards.map((card, index) => {
						return (
							<li className="card-item" key={index}>
								<img className="card-img" src={card.src} alt={card.alt} />
							</li>
						);
					}, [])}
				</ul>
				<p className="awards">
					В качестве дополнительной награды ты можешь посмотреть мультик
				</p>
				<div className="video-content" ref={iframeContainer}></div>
				<Link className="button-common" to="/main">
					В главное меню
				</Link>
			</div>
		</div>
	);
}

export default Cartoon;
