import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import useAuth from "../utils/auth";

function Register({onRegister}) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

function handleSubmit(e) {
  // Запрещаем браузеру переходить по адресу формы
  e.preventDefault();
    useAuth.registerUser(formValue.email, formValue.password)
    .then((res) => {
      onRegister(formValue.email, formValue.password)
      navigate('/sign-in', {replace: true});
      }
    )
    .catch((err) => console.log(err));
  
}

  return(
    <section className="login__container">
      <h2 className="login__title">Регистрация</h2>

      <form className="login__form" onSubmit={handleSubmit}>

      <input 
        className="login__input"
        type="email"
        name="email"
        placeholder="Email"
        value={formValue.email}
        onChange={handleChange}
        required>
      </input>

      <input
          className="login__input"
          type="password"
          name="password"
          placeholder="Пароль"
          value={formValue.password}
          autoComplete="on"
          minLength="5"
          onChange={handleChange}
          required
        />

        <button 
        className="login__button"
        type="submit"
        >
          Зарегистрироваться
        </button>
        </form>
        <p className="login__subtitle">Уже зарегистрированы?
        <Link to="login" className="login__link"> Войти</Link>
        </p>
    </section>
  )
}

export default Register;