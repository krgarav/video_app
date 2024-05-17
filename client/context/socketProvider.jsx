import { useContext, useMemo } from "react";
import SocketContext from "./socketContext";
import { io } from "socket.io-client";

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};
const SocketProvider = (props) => {
  const socket = useMemo(() => io("http://localhost:7000"), []);
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
