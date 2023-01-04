import "./App.css";
import Home from "./pages/home";
import Game from "./pages/Game";
import Finish from "./pages/Finish";
import { Route, Routes, BrowserRouter } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />

          <Route path="/finish" element={<Finish />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
