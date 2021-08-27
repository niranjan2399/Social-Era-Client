import "./App.scss";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import LoginRegister from "./pages/LoginRegister/LoginRegister";
import { AuthContext } from "./authContext/AuthContext";
import { useContext } from "react";
import Messenger from "./pages/messenger/Messenger";
import Bookmarks from "./pages/bookmarks/Bookmarks";
import EditPost from "./pages/editPost/EditPost";

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
            path="/profile/:id"
            exact
            render={() => (user ? <Profile /> : <LoginRegister login />)}
          />
          <Route
            path="/register"
            exact
            render={() => (user ? <Redirect to="/" /> : <LoginRegister />)}
          />
          <Route
            path="/messenger"
            exact
            render={() => (user ? <Messenger /> : <Redirect to="/" />)}
          />
          <Route
            path="/bookmarks"
            exact
            render={() => (user ? <Bookmarks /> : <Redirect to="/" />)}
          />
          <Route
            path="/post/:id"
            exact
            render={() => (user ? <EditPost /> : <Redirect to="/" />)}
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
