import React, { useEffect, useState, useContext } from "react";
import LeftSection from "../../components/leftSection/LeftSection";
import Feed from "../../components/feed/Feed";
import RightSection from "../../components/rightSection/RightSection";
import "./Home.scss";
import Navbar from "../../components/navbar/Navbar";
// import { io } from "socket.io-client";
import { AuthContext } from "../../authContext/AuthContext";

function Home({ socket }) {
  // const socket = useRef();
  const { user } = useContext(AuthContext);
  const [online, setOnline] = useState();

  // useEffect(() => {
  //   socket.current = io(process.env.SOCKET_ADDRESS, {
  //     reconnection: true,
  //     reconnectionDelay: 1000,
  //     maxReconnectionAttempts: Infinity,
  //   });
  // }, []);

  useEffect(() => {
    if (socket) {
      // socket.emit("addUser", user._id);
      socket.on("getUsers", (data) => {
        console.log(data);
        setOnline(data);
      });
    }

    return () => {
      setOnline(null);
    };
  }, [user, socket]);

  useEffect(() => {
    document.querySelector("body").removeAttribute("style");
  }, []);

  return (
    <>
      <Navbar />
      <div className="homeContainer">
        <LeftSection />
        <Feed />
        <RightSection data={online} />
      </div>
    </>
  );
}

export default Home;
