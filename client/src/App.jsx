
import "./App.css";
import Room from './pages/Room';
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/room/:roomId" element={<Room />} />
    </Routes>
  );
}

export default App;
