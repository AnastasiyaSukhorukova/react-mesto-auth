import React from "react";
import {useNavigate} from 'react-router-dom';
import useAuth from "../utils/auth";

function Login(initialValue) {

  const [formValue, setFormValue] = React.useState(initialValue ?? "")

  const handleChange = (e) => {
    const {name, value} = e.target.value;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password){
      return;
    }
    useAuth.loginUser(formValue.email, formValue.password)
      .then((data) => {
      if(data.jwt) {
        setFormValue({email: '', password: ''});
        navigate('/', {replace: true});
      }
      })
      .catch(err => console.log(err));
  }


  return(
    <section className="login__container">
      <h2 className="login__title">Вход</h2>

      <form className="login__form" onSubmit={handleSubmit}>

      <input 
        className="login__input"
        type="email"
        placeholder="Email"
        value={formValue.email}
        onChange={(e) => handleChange(e)}
        required>
      </input>

      <input
          className="login__input"
          type="password"
          placeholder="Пароль"
          value={formValue.password}
          autoComplete="on"
          minLength="5"
          onChange={(e) => handleChange(e)}
          required
        />

        <button 
        className="login__button"
        type="submit"
        onSubmit={handleSubmit}
        >
          Войти
        </button>
        </form>
    </section>
  )
}

export default Login;