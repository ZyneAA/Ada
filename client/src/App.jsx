import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Code from "./components/Code/Code"
import Test from "./components/Test"
import Login from "./components/Lnr/Login"
import Settings from "./components/Settings/Settings"
import Test1 from "./components/Test1"
import Register from "./components/Lnr/Register"

function App() {

    return(
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/code" element={<Code/>} />
                <Route path="settings" element={<Settings/>} />
                <Route path="/test" element={<Test/>} />
                <Route path="/test1" element={<Test1/>} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    )

}

export default App
