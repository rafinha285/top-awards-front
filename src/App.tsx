import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {UserProvider} from "./context/UserContext.tsx";
import {LoginPage} from "./pages/LoginPage.tsx";
import {RegisterPage} from "./pages/RegisterPage.tsx";


function App() {

  return (
    <>
        <Router>
            <UserProvider>
                <Routes>
                    <Route path={"/"} element={<LoginPage/>}/>
                    <Route path={"/register"} element={<RegisterPage/>}/>
                </Routes>
            </UserProvider>
        </Router>
    </>
  )
}

export default App
