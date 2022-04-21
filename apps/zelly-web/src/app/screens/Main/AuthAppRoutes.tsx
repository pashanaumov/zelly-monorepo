import {Route, Routes} from "react-router-dom";
import {LoginScreen} from "../Auth/Login";
import {RegisterScreen} from "../Auth/Register";

export const AuthAppRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginScreen/>}/>
      <Route path="register" element={<RegisterScreen/>}/>
    </Routes>
  )
}
