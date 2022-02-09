import "./App.scss";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Profile from "./pages/profile/Profile";
import LoginRegister from "./pages/LoginRegister/LoginRegister";
import { AuthContext } from "./authContext/AuthContext";
import { useContext, useEffect, useState } from "react";
import Messenger from "./pages/messenger/Messenger";
import Bookmarks from "./pages/bookmarks/Bookmarks";
import EditPost from "./pages/editPost/EditPost";
import CompleteProfile from "./pages/completeProfile/CompleteProfile";
import axios from "./axios";
import FriendRequest from "./pages/friendRequests/FriendRequest";
import SearchFriends from "./pages/searchFriends/SearchFriends";
// import Chat from "./pages/chat/Chat";
import { io } from "socket.io-client";

function App() {
  const { user, dispatch } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    user &&
      (() => {
        const newSocket = io(
          "wss://social-era-socket.herokuapp.com",
          // "ws://localhost:8000",
          {
            reconnection: true,
            reconnectionDelay: 1000,
            maxReconnectionAttempts: Infinity,
          }
        );

        setSocket(newSocket);
      })();

    return () => setSocket(null);
  }, [user]);

  useEffect(() => {
    if (socket && user) {
      socket.emit("addUser", user._id);
    }
  }, [socket, user]);

  useEffect(() => {
    (async () => {
      const res = await axios.get("/users/current-user");
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    })();
  }, [dispatch]);

  return (
    <>
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={() =>
              user ? <Home socket={socket} /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/profile/:id"
            exact
            render={() => (user ? <Profile /> : <Redirect to="/login" />)}
          />
          <Route
            path="/register"
            exact
            render={() => (user ? <Redirect to="/" /> : <LoginRegister />)}
          />
          <Route
            path="/messenger"
            exact
            render={() =>
              user ? <Messenger socket={socket} /> : <Redirect to="/login" />
            }
          />
          {/* <Route
            path="/messenger/:id"
            exact
            render={() => (user ? <Chat /> : <Redirect to="/login" />)}
          /> */}
          <Route
            path="/bookmarks"
            exact
            render={() => (user ? <Bookmarks /> : <Redirect to="/login" />)}
          />
          <Route
            path="/post/:id"
            exact
            render={() => (user ? <EditPost /> : <Redirect to="/login" />)}
          />
          <Route
            path="/friend-requests"
            exact
            render={() => (user ? <FriendRequest /> : <Redirect to="/login" />)}
          />
          <Route
            path="/search-friends"
            exact
            render={() => (user ? <SearchFriends /> : <Redirect to="/login" />)}
          />
          <Route
            path="/user-details/:id"
            exact
            render={() =>
              user ? <CompleteProfile /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/edit-details/:id"
            exact
            render={() =>
              user ? <CompleteProfile /> : <Redirect to="/login" />
            }
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
