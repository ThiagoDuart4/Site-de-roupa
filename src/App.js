import { BrowserRouter, Route, Routes, Link} from "react-router-dom";
import Login from './pages/login/login'
import Home from './pages/Home/Home'
import CreateLogin from './pages/CreateLogin/createLogin'
import './App.css';

import  {onAuthStateChanged} from 'firebase/auth'

// HOOKS 
import { useState,useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";
// CONTEX 
import { AuthProvider } from "./Context/authContext";


function App() {

   const[user,setUser] = useState(undefined)
   const {auth} = useAuthentication()
  



   const loadingUser = user  === undefined

  
    useEffect(()=> {
       onAuthStateChanged(auth,(user) =>{
        setUser(user)
    
       })
    },[auth])

  
if(loadingUser) {
  return <p>Carregando..</p>
}

  return (
    <div className="App">

    <AuthProvider value = {{user}}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/cadastrar' element={<CreateLogin />} />
        <Route path='/home' element={<Home />} />
      </Routes>
      </BrowserRouter>
    </AuthProvider>
      
    </div>
  );
}

export default App;
