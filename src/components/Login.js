import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function Login(props) {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);

// После загрузки текущего пользователя из API
// его данные будут использованы в управляемых компонентах.
// также устанавливаем дефолтное значение если данные еще не пришли

  React.useEffect(() => {
      setEmail(currentUser.email ?? "");
      setPassword(currentUser.password ?? "");
}, [currentUser]); 

function handleChangeName(e) {
  setEmail(e.target.value);
}

function handleChangeDescription(e) {
  setPassword(e.target.value);
}

function handleSubmit(e) {
  // Запрещаем браузеру переходить по адресу формы
  e.preventDefault();

  // // Передаём значения управляемых компонентов во внешний обработчик
  // props.onUpdateUser({
  //   name,
  //   about
  // });
}

  return(
    <PopupWithForm name="login-popup popup_opened" title="Вход" textButton="Войти" onSubmit={handleSubmit}>
        <div className="popup__input-position">
          <input className="popup__input popup__name-text popup__input_type_name" id="popup__name" type="text" value={email} onChange={handleChangeName} placeholder="Email" name="email" minLength="2" maxLength="40" required />
          <span className="popup__input-error popup__name-error"></span>
        </div>
        <div className="popup__input-position">
          <input className="popup__input popup__name-text popup__input_type_job" id="popup__text" type="text" value={password} onChange={handleChangeDescription} placeholder="Пароль" name="password" minLength="2" maxLength="200" required />
          <span className="popup__input-error popup__text-error"></span>
        </div>
    </PopupWithForm>
  )
}

export default Login;