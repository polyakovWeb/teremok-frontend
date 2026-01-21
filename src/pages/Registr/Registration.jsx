import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  registrationInitialValues,
  registrationSchema,
} from "../../components/YupValidation/helpers";
import Input from "../../components/Input/Input";
import "./Registration.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContext/AuthContext";
import axios from "axios";

const API_URL = process.env.API_URL;

function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    resetField,
  } = useForm({
    defaultValues: registrationInitialValues,
    mode: "all",
    resolver: yupResolver(registrationSchema),
  });

  // Обработчик отправки данных формы
  const onSubmit = (data) => {
    // Проверка двух введённых паролей
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      ["confirmPassword", "password"].forEach((name) => {
        console.log(name);
        setError(name, {
          type: "custom",
          message: "Ваши пароли не совпадают",
        });
        resetField(name, { keepError: true });
      });
      return;
    }
    // Запрос на сервер на регистрацию пользователя
    axios
      .post(`${API_URL}/registr`, data)
      .then((res) => {
        if (res.statusText === "OK") {
          alert("Регистраци прошла успешно! Необходимо войти в личный кабинет");
          navigate("/login");
        } else {
          alert("Ошибка во время регистрации.");
          console.error(res);
          setError("server", { message: res.data.errors[0].msg });
        }
      })
      .catch((axiosErr) => {
        alert("Во время регистрации произошла ошибка.");
        // Добавить поле для отображения ошибки? (вдруг введённый email уже существует и прочее)
        // Установить сообщение в поле ошибки при помощи React-Hook-Form

        setError("server", { message: axiosErr.response.data.errors[0].msg });
        console.log(axiosErr);
      });
  };

  const navigate = useNavigate();
  const { isAuth } = useAuth();

  // Для УЖЕ авторизованного пользователя - переадресация на главный экран с alert уведомлением
  if (isAuth) {
    setTimeout(() => navigate("/"), 3000);
    return (
      <div>
        <h2 className="title">Вы уже авторизованы!</h2>
        <div className="message">Переадресация через 3 секунды...</div>
      </div>
      // Модальное окно
      // <ModalWindow title={"Вы уже авторизованы!"} message={"Переадресация..."} />
    );
  }

  return (
    <div className="form-wrapper registration">
      <div className="wrapper__content">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="form__title">Регистрация</h1>
          <Input
            name="firstName"
            labelText="Ваше имя *"
            placeholder="Имя"
            register={register}
            errors={errors}
          />
          <Input
            name="lastName"
            labelText="Ваша фамилия *"
            placeholder="Фамилия"
            register={register}
            errors={errors}
          />
          <Input
            name="patronymic"
            labelText="Ваше отчество (необязательно)"
            placeholder="Отчество"
            register={register}
            errors={errors}
          />
          <Input
            name="email"
            labelText="Почтовый ящик *"
            placeholder="Введите почту"
            register={register}
            errors={errors}
          />
          <Input
            name="password"
            labelText={"Придумайте пароль (от 5 до 50 символов)*"}
            placeholder={"Введите пароль"}
            register={register}
            errors={errors}
            type={"password"}
          />
          <Input
            name="confirmPassword"
            labelText={"Введите пароль повторно*"}
            placeholder={"Введите пароль"}
            register={register}
            errors={errors}
            type={"password"}
          />
          {/* Опционально: добавить загрузку файла аватарки на сервер */}

          {/* Поле с условным рендером для отображения ошибки, если та возникает в процессе авторизации */}
          {errors.server && (
            <div style={{ color: "red" }}>
              <p>{errors.server.message}</p>
            </div>
          )}
          <button type="submit" className="form__button button-hovered">
            Зарегистрироваться
          </button>
        </form>
      </div>
      <div className="border"></div>
      <div className="wrapper__footer footer">
        <div className="footer__title">
          Уже есть свой профиль? Войдите по кнопке ниже!
        </div>
        <Link to="/login" className="footer__button button-hovered">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Registration;
