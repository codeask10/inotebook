import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import NoteState from "./context/notes/NoteState";
import Alert from "./Components/Alert";
import { useState} from 'react'

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert=(message,type)=>{
    setAlert({
      msg: message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/" element={<Home  showAlert={showAlert} />} ></Route>
              <Route exact path="/Login"  element={<Login showAlert={showAlert} />} ></Route>
              <Route exact path="/Signup" element={<Signup showAlert={showAlert} />} ></Route>

            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;






