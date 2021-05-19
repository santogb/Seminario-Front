import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "./Login.scss";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Logo from "../../Assets/Images/infinite transparente.svg";
import { login } from "../../Services/empleadosServices";
import {
  setToken,
  setActiveSession,
  setIdUser,
  setIdTipoEmpleado,
  removeToken,
  removeActiveSession,
  removeIdUser,
  removeIdTipoEmpleado
} from "../../Services/sessionServices";

const CustomTextField = withStyles({
  root: {
    "& .MuiFormLabel-root": {
      color: "#404040",
    },
    "& label.Mui-focused": {
      color: "#404040",
      fontWeight: "bold",
    },
    "& .MuiInput-underline:before": {
      "border-bottom-color": "#404040 !important",
    },
    "& .MuiInput-underline:after": {
      "border-bottom-color": "#404040 !important",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#404040",
      },
      "&:hover fieldset": {
        borderColor: "#404040",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#404040",
      },
    },
    '& input[type="text"]': {
      color: "#404040",
    },
    '& input[type="password"]': {
      color: "#404040",
    },
  },
})(TextField);

export default class Login extends Component {
  constructor(props) {

    document.title = "Infinite - Login";

    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false,
      hasError: false,
      error: "",

    };
  }

  /* atributo 'name' viene de la referencia al atributo que se pasa por parametro en el input */
  handleChange = (name) => (event) =>
    this.setState((prevState) => ({
      ...prevState,
      [name]: event.target.value,
      isLoading: false,
      hasError: false,
      error: "",
    }));

  login = (e) => {
    e.preventDefault();

    const request = {
      email: this.state.email,
      password: this.state.password,
    };

    if (request.email === "") {
      this.setState((prevState) => ({
        ...prevState,
        isLoading: false,
        hasError: true,
        error: "Debe ingresar un Email.",
      }));
    } else if (request.password === "") {
      this.setState((prevState) => ({
        ...prevState,
        isLoading: false,
        hasError: true,
        error: "Debe ingresar una constraseña.",
      }));
    }

    if (request.email !== "" && request.password !== "") {
      this.setState({ isLoading: true });

      login(this.state.email, this.state.password).then((response) => {
        removeToken();
        removeActiveSession();
        removeIdTipoEmpleado();
        removeIdUser();


        //LOGUEAR AUTOMATICAMENTE:
        setToken("1234");
        setActiveSession(true);
        setIdUser("60a1ded49101f6237c9afe29");
        setIdTipoEmpleado("3");
        //HASTA ACÁ

        //COMENTADO PARA LOGUEAR AUTOMATICAMENTE:
        // if (response && response.empleado) {
        //   setToken(response.token);
        //   setActiveSession(true);
        //   setIdEmpleado(response.empleado.id);
        //   setIdTipoEmpleado(response.empleado.tipo?.id);

        this.props.history.replace("/");
          
        // } else {
        //   this.setState((prevState) => ({
        //     ...prevState,
        //     isLoading: false,
        //     hasError: true,
        //     error: response?.message,
        //   }));
        // }

      });
    }
  };

  render() {
    return (
      <div className="loginContainer">
        <div>
          <img src={Logo} alt="Logo" className="logo" />
        </div>
        <Container maxWidth="xs">
          <form onSubmit={this.login}>
            <div className="loginInput">
              <CustomTextField
                id="email"
                label="Email"
                type="text"
                fullWidth
                onChange={this.handleChange("email")}
              />
            </div>
            <div className="loginInput">
              <CustomTextField
                id="password"
                label="Password"
                type="password"
                fullWidth
                onChange={this.handleChange("password")}
              />
            </div>
            <div className="loginButton">
              {this.state.hasError && (
                <p style={{ color: "red" }}>
                  {this.state.error !== null && this.state.error !== ""
                    ? this.state.error
                    : "Email o password incorrecto/s."}
                </p>
              )}
              {!this.state.isLoading && (
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  fullWidth
                >
                  Ingresar
                </Button>
              )}
              {this.state.isLoading && (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled
                >
                  {" "}
                  <CircularProgress
                    size={18}
                    color="secondary"
                    style={{ marginRight: "10px" }}
                  />{" "}
                  Validando...
                </Button>
              )}
            </div>
          </form>
        </Container>
      </div>
    );
  }
}
