import React from 'react'
import style from '../login/login.module.css'
import {Link } from "react-router-dom";
import { useState } from 'react';

import { FcGoogle } from 'react-icons/fc';

const Login = () => {

  const [email,setEmail] = useState('');
  const [senha,setSenha] = useState('');



   const handleSubmit = (e) =>{
    e.preventDefault();
    const user = {
      email,
      senha
    }

   }
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
              <input type="email" name='email' onChange={(e)=>{
              setEmail(e.target.value)
              }}/>
            </label>
            <label >
              Senha
              <input type="password" name='senha'   onChange={(e)=>{setSenha(e.target.value)}}/>
            </label>
            <hr/>
            <input type="submit" value="Logar" name='logar' />
         </form>

          <p>Não tem uma conta?<span><Link to ='/cadastrar'>Crie uma</Link></span></p>
          <p>Esqueci minha senha</p>
    <div className={style.SocialBtn}>
    <button className={style.GoogleBtn}>
           <FcGoogle  className={style.Gicon}/>
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