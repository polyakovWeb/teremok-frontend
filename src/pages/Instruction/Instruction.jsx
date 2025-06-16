import "./Instruction.scss";
import step1 from "../../img/instruction_1.jpg";
import step2 from "../../img/instruction_2.jpg";
import step3 from "../../img/instruction_3.jpg";
import step4 from "../../img/instruction_4.jpg";

function Instruction() {
	return (
		<div className="instruction-wrapper">
			<h1 className="title">Инструкция использования тренажёра</h1>
			<p className="info">
				Доступ к тренажёру открыт всем, однако перед тем, как приступить к его
				использованию, необходимо выполнить 2 необходимых действия:
			</p>
			<ul className="step-list">
				<li className="instruction-step">
					<span>
						Создать свою учётную запись (родителя/специалиста) на данной платформе
						"Теремок"
					</span>
				</li>
				<li className="instruction-step">
					<span>
						В личном кабинете зарегистрировать ребятишек, желающих использовать
						тренажёр. Это необходимо для работы тренажёра
					</span>
				</li>
			</ul>
			<p className="info">
				После выполнения перечисленных действий вы можете переходить к самому
				тренажёру при помощи навигации сверху - раздел "Тренажёр"
			</p>
			<p className="info">
				Перед началом выполнения заданий в самом тренажёре, необходимо провести его
				простую настройку. Для этого вам будут представлены соответствующий окошки с
				возможностью выбора. Примеры проиллюстрированы ниже:
			</p>
			<div className="grid-img">
				<figure className="img step1">
					<div className="num-wrapper">
						<p className="number">1</p>
					</div>
					<img src={step1} alt="Step 1" />
					<figcaption>Выбор ребёнка</figcaption>
				</figure>
				<figure className="img step2">
					<div className="num-wrapper">
						<p className="number">2</p>
					</div>
					<img src={step2} alt="Step 2" />
					<figcaption>Выбор типа задачи</figcaption>
				</figure>
				<figure className="img step3">
					<div className="num-wrapper">
						<p className="number">3</p>
					</div>
					<img src={step3} alt="Step 3" />
					<figcaption>Выбор карточек</figcaption>
				</figure>
				<figure className="img step4">
					<div className="num-wrapper">
						<p className="number">4</p>
					</div>
					<img src={step4} alt="Step 4" />
					<figcaption>Задание тренажёра</figcaption>
				</figure>
			</div>
			<p className="info">
				Предоставьте выбор понравившихся карточек ребёнку, ведь за правильно
				выполненое задание он будет награждаться одной из них. А после выполнения
				всех заданий - сможет посмотреть собранные им карточки и мультик.
			</p>
			<p className="info">
				На каждое задание доступно 2 подсказки, которые появляются при допущении
				ошибки в решении. Ошибаться можно сколь угодно раз, однако подсказки
				отображаются лишь после 1-ой и 2-ой ошибок.
			</p>
			<p className="info">
				Если ребёнок решил задание верно не с первой попытки, то запускается процесс
				отвлечения в виде таймера, где ему необходимо похлопать в ладоши. После
				окончания таймера ребёнок должен решить верно этот же пример, но с первого
				раза. Иначе его ждёт повторение описанных выше действий до тех пор, пока
				задание будет выполнено без допущения ошибок.
			</p>
			<p className="info">
				На этом инструктаж окончен. Можете опробовать тренажёр самостоятельно с
				ребёнком.
			</p>
			<p className="info goodluck">Желаем вам хорошего обучения!</p>
		</div>
	);
}

export default Instruction;
