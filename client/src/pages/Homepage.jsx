import { useState, useEffect, useCallback } from "react";

import { useSocket } from "../../context/socketProvider";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  const socket = useSocket();

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join");
    };
  }, [socket]);

  const handleJoinRoom = useCallback((msg) => {
    console.log(msg);
  }, []);

  const submitHandler = useCallback(
    (event) => {
      event.preventDefault();
      const roomId = event.target.roomId.value;
      const emailId = event.target.emailId.value;
      socket.emit("room:join", { emailId, roomId });
      navigate(`room/${roomId}`);
    },
    [socket]
  );
  //   const submitHandler = (event) => {
  //     event.preventDefault();
  //     const roomId = event.target.emailId.value;
  //     const emailId = event.target.roomId.value;
  //     socket.emit("chat message", { emailId, roomId });
  //   };
  //   console.log(selectedCamera);

  return (
    <>
      <div>Player</div>

      <div>
        <form onSubmit={submitHandler}>
          <label htmlFor="emailId">Email Id : </label>
          <input id="emailId" type="email" placeholder="Enter your email" />
          <br />
          <label htmlFor="roomId">Room Id : </label>
          <input id="roomId" type="text" placeholder="Enter room Id" />
          <br />
          <button type="submit">Connect</button>
        </form>
      </div>
    </>
  );
}

export default Homepage;
