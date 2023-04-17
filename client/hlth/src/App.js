import './App.css';
import Login from "./components/Login/login"
import { ChakraProvider } from "@chakra-ui/react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Signup from './components/Signup/signup';
import Home from './components/LandingPage1/home';
import UserProfileEdit from './components/UpdateProfile/updateProfile.js';
import DailyInput from './components/DailyInput/dailyInput.js';
import StatusPage from './components/LandingPage1/statusPage.js';

function App() {
  return (
    <>
    <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/updateProfile" element={<UserProfileEdit/>}/>
        <Route exact path="/dailyInput" element={<DailyInput />} />
        <Route exact path="/status" element={<StatusPage />} />
      </Routes>
      </BrowserRouter>
    </ChakraProvider>
    </>
  );
}

export default App;
