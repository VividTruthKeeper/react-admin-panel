// Modules
import { Routes, Route } from "react-router-dom";

// Style
import "./assets/styles/style.scss";

// Pages
import Login from "./pages/Login";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
