import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import LoginPage from "./Login";
import SignUp from "./signUp";
import NotFound from "./NotFound";



const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact component={Home} />
        <Route exact component={NotFound} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/signup" exact component={SignUp} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;