import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Code from "./components/Code/Code"
import Test from "./components/Test"
import Login from "./components/Lnr/Login"

function App() {

    return(
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/code" element={<Code/>} />
                <Route path="/test" element={<Test/>} />
            </Routes>
        </Router>
    )

}

export default App
