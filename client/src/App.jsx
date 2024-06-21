import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Code from "./components/Code_Component/Code"
import Test from "./components/Test"

function App() {

    return(
        <Router>
            <Routes>
                <Route path="/code" element={<Code/>} />
                <Route path="/test" element={<Test/>} />
            </Routes>
        </Router>
    )

}

export default App
