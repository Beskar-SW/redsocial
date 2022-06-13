import React, { useState, useEffect } from "react";
import icon from "./Components/icons/logo.svg";
import './index.css'
import Home from "./Components/Home";

function Login() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [logeado, setLoged] = useState(false);
  const [mode, setMode] = useState("login");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if(user){
      setLoged(true);
    }else{
      return setLoged(false);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "login") {
      fetch(`http://localhost:1000/login/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            localStorage.setItem("user", username);    
            setLoged(true);
          } else {
            alert("Usuario o contraseña incorrectos")
          }
        });

    }
    if (mode === "signup") {
      if (password !== repeatPassword) {
        alert(`Las contraseñas no coinciden`);
      } else {

        fetch(`http://localhost:1000/login/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            username: username,
            password: password,
            email: email,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              alert("Usuario creado correctamente");
              setTimeout(() => {
                window.location.reload();
              }, 500);
            } else {
              if (data.message === "El usuario ya existe") {
                alert("El usuario ya existe");
              }
            }
          });
      }
    }
  }

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
  }

  if (!logeado) {
    return (
      <>
        <header>
          <section className="section-navbar">
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5  dark:bg-gray-800">
              <div className="container flex flex-wrap justify-evenly items-center mx-auto">
                <a href="/" className="flex items-center">
                  <img src={icon} alt="logo" className="w-20 h-20 fill-blue-500" />
                  <span className="self-center text-5xl font-semibold whitespace-nowrap dark:text-white pl-7">HELP ME</span>
                </a>
              </div>
            </nav>
          </section>
        </header>

        <section style={{ display: 'flex', flexDirection: "row", width: "100%", justifyContent: "space-evenly", marginTop: 20 }}>
          <div style={{ width: "40%", display: "flex", flexDirection: "column", alignItems: "center", height: 500, justifyContent: "space-evenly" }}>
            <img src={icon} style={{ width: "60%", height: "60%" }} alt="logo"></img>
            <h1>HELP ME</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>
          <div>
            <section className={`form-block form-block--is-${mode}`} style={{ width: "120%" }}>
              <header className="form-block__header">
                <h1>{mode === 'login' ? 'Welcome back!' : 'Sign up'}</h1>
                <div className="form-block__toggle-block">
                  <span>{mode === 'login' ? 'Don\'t' : 'Already'} have an account? Click here &#8594;</span>
                  <input id="form-toggler" type="checkbox" onClick={toggleMode} />
                  <label htmlFor="form-toggler"></label>
                </div>
              </header>
              <LoginForm mode={mode} onSubmit={handleSubmit} data={{ "set": [setEmail, setPassword, setUsername, setRepeatPassword] }} />
            </section>
          </div>

        </section>
      </>
    )

  } else {
    return <Home />
  }
}
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <div className="form-block__input-wrapper">
          <div className="form-group form-group--login">
            <Input type="text" id="username" label="username" disabled={this.props.mode === 'signup'} data={this.props.data} />
            <Input type="password" id="password" label="password" disabled={this.props.mode === 'signup'} data={this.props.data} />
          </div>
          <div className="form-group form-group--signup">
            <Input type="text" id="fullname" label="username" disabled={this.props.mode === 'login'} data={this.props.data} />
            <Input type="email" id="email" label="email" disabled={this.props.mode === 'login'} data={this.props.data} />
            <Input type="password" id="createpassword" label="password" disabled={this.props.mode === 'login'} data={this.props.data} />
            <Input type="password" id="repeatpassword" label="repeat password" disabled={this.props.mode === 'login'} data={this.props.data} />
          </div>
        </div>
        <button className="button button--primary full-width" type="submit">{this.props.mode === 'login' ? 'Log In' : 'Sign Up'}</button>
      </form>
    )
  }
}

const Input = ({ id, type, label, disabled, data }) => (
  <input className="form-group__input" type={type} id={id} placeholder={label} disabled={disabled} onChange={() => {
    if (type === "password") {
      if (id === "password") {
        var setPassword = data["set"][1];
        setPassword(document.getElementById(id).value);
      }
      if (id === "createpassword") {
        var setPassword = data["set"][1];
        setPassword(document.getElementById(id).value);
      }
      if (id === "repeatpassword") {
        var setRepeatPassword = data["set"][3];
        setRepeatPassword(document.getElementById(id).value);
      }
    } else if (type === "text") {
      var setUsername = data["set"][2];
      setUsername(document.getElementById(id).value);
    } else {
      var setEmail = data["set"][0];
      setEmail(document.getElementById(id).value);
    }
  }} />
);

export default Login;
