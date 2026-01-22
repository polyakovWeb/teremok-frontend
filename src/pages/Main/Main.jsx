import "./Main.css";
import cleverImg from "../../img/clever.png";

function Main() {
  return (
    <section className="main">
      <div className="main__info">
        <h1 className="main__title title">
          Интерактивный тренажер по математике, с встроенным методом
          безошибочного обучения для детей дошкольного возраста
        </h1>
        <div className="main__description text">
          Добро пожаловать на сайт, с помощью которого дети учатся решать
          математичексие задачи по следующим темам: сложение, вычитание,
          порядковый счет, состав числа. Ниже вы можете ознакомиться с разделами
          сайта
        </div>
      </div>
      <div className="steps">
        <div className="step step-one">
          <div className="step__number">
            <img src={cleverImg} alt="Clever" />
            <p>1</p>
          </div>
          <h2 className="step__title title">Инструкция по тренажёру</h2>
          <div className="step__text text">
            В данной вкладке вы сможете ознакомиться с инструкцией по тому, как
            правильно использовать тренажер в обучающих целях
          </div>
        </div>
        <div className="step step-two">
          <div className="step__number">
            <img src={cleverImg} alt="Clever" />
            <p>2</p>
          </div>
          <h2 className="step__title title">Методические указания</h2>
          <div className="step__text text">
            В данной вкладке вы сможете узнать информацию про метод
            безошибочного обучения, его цель и как он реализован в тренажере
          </div>
        </div>
        <div className="step step-three">
          <div className="step__number">
            <img src={cleverImg} alt="Clever" />
            <p>3</p>
          </div>
          <h2 className="step__title title">Тренажёр</h2>
          <div className="step__text text">
            В данной вкладке реализован сам тренажер
          </div>
        </div>
        <div className="step step-four">
          <div className="step__number">
            <img src={cleverImg} alt="Clever" />
            <p>4</p>
          </div>
          <h2 className="step__title title">Личный кабинет</h2>
          <div className="step__text text">
            В данной вкладке необходимо зарегистрироваться перед началом
            использования тренажера или выполнить вход в уже существующий
            профиль
          </div>
        </div>
      </div>
    </section>
  );
}

export default Main;
