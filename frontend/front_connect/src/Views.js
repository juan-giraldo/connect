import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Prompt from "./Prompt";
import Loged from "./components/Loged"
import ProtectedRoutes from "./Protected_route";

const Views = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />  
        <Route element={<ProtectedRoutes />}>
          <Route path="connect" element={<Loged />} />
        </Route>
      </Routes> 
    </BrowserRouter>
  );
};

export default Views;