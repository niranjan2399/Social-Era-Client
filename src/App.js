import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Timeline from './pages/timeline/Timeline'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact render={() => <Home />} />
          <Route path="/timeline" exact render={() => <Timeline />} />
          <Route path="/register" exact render={() => <Register />} />
          <Route path="/login" exact render={() => <Login />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
