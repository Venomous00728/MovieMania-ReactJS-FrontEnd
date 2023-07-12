import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./Components/movies";
import NavBar from "./Components/navbar";
import Customers from "./Components/tabs/customers";
import NotFound from "./Components/tabs/not-found";
import LoginForm from "./Components/tabs/loginForm";
import registerForm from "./Components/tabs/registerForm";
import MovieForm from "./Components/tabs/movieForm";
import ProtectedRoute from "./Components/common/protectedRoute";
import Logout from "./Components/tabs/logout";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import auth from "./services/authService";
import { Provider } from "react-redux";
import { store } from "./Components/slices/store";

class App extends Component {
  state = {
    addClass: "-o",
  };

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  handleLike = (adClass) => {
    let addClass = this.state.addClass;
    addClass = "";
    this.setState(addClass);
  };

  render() {
    const { user } = this.state;
    return (
      <Provider store={store}>
        <main className="theMainContainer">
          <ToastContainer />
          <NavBar />
        </main>
      </Provider>
    );
  }
}

export default App;
