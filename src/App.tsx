import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Home"
import Register from "./Register"
import Signin from "./Signin"
import Prov from "./Prov"

function App() {
  return (
    <BrowserRouter>
    <Prov>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Prov>
    </BrowserRouter>
  )
}

export default App