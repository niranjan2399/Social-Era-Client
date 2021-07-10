import "./App.scss";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import LoginRegister from "./pages/wrapper/LoginRegister";
import { AuthContext } from "./authContext/AuthContext";
import { useContext } from "react";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (user ? <Home /> : <LoginRegister login />)}
          />
          <Route
            path="/profile"
            exact
            render={() => (user ? <Profile /> : <LoginRegister login />)}
          />
          <Route
            path="/register"
            exact
            render={() => (user ? <Redirect to="/" /> : <LoginRegister />)}
          />
          <Route
            path="/login"
            exact
            render={() =>
              user ? <Redirect to="/" /> : <LoginRegister login />
            }
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
