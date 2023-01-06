import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login/Login.js";
import Signup from "./components/Signup/Signup.js";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
