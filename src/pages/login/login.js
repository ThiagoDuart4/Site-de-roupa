import React from 'react'
import style from '../login/login.module.css'
import {Link } from "react-router-dom";
import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import { FcGoogle } from 'react-icons/fc';

import { useAuthentication } from '../../hooks/useAuthentication'


const Login = () => {

  const [email,setEmail] = useState('');
  const [senha,setSenha] = useState('');
  const [error,setError] = useState()


  const navigate = useNavigate()

  const {login, error: authError , loading,redirect,GoogleLogar} = useAuthentication()



   const handleSubmit =  async(e) =>{
    e.preventDefault();

    setError('')
  
    const user = {
      email,
      senha
    }


    const res = await login(user)

   }

  //  LOGIN COM O GOOGLE

   const actionGoogleLogin  =  async() =>{
    GoogleLogar()
   }
   
 useEffect(()=>{
    if (redirect === 1) {
      navigate("./home")
    }
   },[redirect])

   useEffect(()=>{
    if(authError){
      setError(authError)
    }
  })

   
  return (
    <div className={style.login}>
      <section className={style.image}>
        Imagem
      </section>
      <section className={style.EnterLogin}>
        <div className={style.EnterLoginInfo}>
        <h1>Faça o login </h1>
        <div className={style.FormLogin}>
        <form  onSubmit={handleSubmit}>
            <label >
              Email
              <input
               type="email"
                name='email' 
                required
                value={email}
                onChange={(e)=>{
              setEmail(e.target.value)
              }}/>
            </label>
            <label >
              Senha
              <input 
              type="password" 
              name='senha' 
              required
              value={senha} 
               onChange={(e)=>{setSenha(e.target.value)}}/>
            </label>
            <hr/>
            <input type="submit" value="Logar" name='logar' />
         </form>
         {error && <p>{error}</p>}
          <p>Não tem uma conta?<span><Link to ='/cadastrar'>Crie uma</Link></span></p>
          <p>Esqueci minha senha</p>
    <div className={style.SocialBtn}>
    <button className={style.GoogleBtn} onClick={actionGoogleLogin}>
           <FcGoogle  className={style.Gicon} />
            <h3>Continue com Google</h3>
          </button>
    </div>
         
        </div>
        
        </div>
      </section>
    </div>
  )
}

export default Login