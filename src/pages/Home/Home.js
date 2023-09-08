import React from 'react'

import { useAuthentication } from '../../hooks/useAuthentication'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../Context/authContext'
const Home = () => {

  const {logout} = useAuthentication()
  const navigate = useNavigate()
  const {user} = useAuthValue()

  const LogoutUser = () =>{
    logout()

    navigate("/")
  }
  return (
    <div> 
      <h1> BEM VINDO(A): {user.displayName
} </h1>

      <button onClick={LogoutUser}>SAIR</button>
    </div>
  )
}

export default Home