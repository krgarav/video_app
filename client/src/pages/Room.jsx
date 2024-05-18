import React, { useEffect, useState, useCallback } from "react";
import { useSocket } from "../../context/socketProvider";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
const Room = () => {
  const [myStream, setMyStream] = useState(null);
  const [availableCameras, setAvailableCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState("");
  const [connectedUser, setConnectedUser] = useState([]);
  const socket = useSocket();
  const { roomId } = useParams();
  useEffect(() => {
    socket.on("user:joined", handleUserJoin);
    socket.on("room:clients", handleRoomMember);
    return () => {
      socket.off("user:joined", handleUserJoin);
      socket.off("room:clients", handleUserJoin);
    };
  }, [socket]);
  const handleRoomMember = useCallback((data) => {
    setConnectedUser(data.room)
    console.log(data.room)
    // console.log(data)
  }, []);
  const handleUserJoin = useCallback((data) => {
    // setConnectedUser((prev) => {
    //   return [...prev, data];
    // });
    
  }, []);
  const getuserMediaStream = useCallback(async () => {
    try {
      setMyStream(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: { deviceId: { exact: selectedCamera } },
      });
      setMyStream(stream);
    } catch (error) {
      console.error("Error accessing user media:", error);
    }
  }, [selectedCamera]);

  const fetchMediaDevices = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((device) => device.kind === "videoinput");
      setAvailableCameras(cameras);
      setSelectedCamera(cameras[0]?.deviceId || "user");
    } catch (error) {
      console.error("Error fetching media devices:", error);
    }
  }, []);

  useEffect(() => {
    fetchMediaDevices();
  }, [fetchMediaDevices]);

  useEffect(() => {
    getuserMediaStream();
  }, [getuserMediaStream]);

  const handleCameraChange = (event) => {
    setSelectedCamera(event.target.value);
  };
  return (
    <>
      <div>Room {roomId}</div>
      <div>
        {availableCameras.length > 0 && (
          <select value={selectedCamera} onChange={handleCameraChange}>
            {availableCameras.map((camera) => (
              <option key={camera.deviceId} value={camera.deviceId}>
                {camera.label ||
                  `Camera ${availableCameras.indexOf(camera) + 1}`}
              </option>
            ))}
          </select>
        )}
      </div>
      <div>
        {myStream && (
          <ReactPlayer
            url={myStream}
            // controls={true}
            muted
            width="100%"
            height="100%"
            playing
          />
        )}
        <div>
          Users Connected:
          {connectedUser.map((item) => {
            return <h2>{item.socketData}</h2>;
          })}
        </div>
        <button>Call</button>
      </div>
    </>
  );
};

export default Room;
