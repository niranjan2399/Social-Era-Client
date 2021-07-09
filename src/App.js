import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home/Home";
// import Login from "./pages/login/Login";
// import Register from "./pages/register/Register";
import Timeline from './pages/timeline/Timeline'
import LoginRegister from "./pages/wrapper/LoginRegister";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact render={() => <Home />} />
          <Route path="/timeline" exact render={() => <Timeline />} />
          <Route path="/register" exact render={() => <LoginRegister />} />
          <Route path="/login" exact render={() => <LoginRegister login/>} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
