import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Login from './pages/login/login'
import CreateLogin from './pages/CreateLogin/createLogin'
import './App.css';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Cadastrar' element={<CreateLogin />} />
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
