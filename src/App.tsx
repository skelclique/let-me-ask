import { BrowserRouter, Route, Routes } from "react-router-dom";

import { NewRoom } from "./pages/NewRoom";
import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-room" element={<NewRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;