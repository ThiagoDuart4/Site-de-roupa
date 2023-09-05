import React, { useEffect } from 'react'
import style from '../CreateLogin/createLogin.module.css'

import { useState } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'


const CreateLogin = () => {

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [ConfirmPassword,setConfirmPassword] = useState('')
 const [error,setError] = useState()

  const {createUser, error: authError , loading,msg} = useAuthentication()


const handleSubmit = async (e) =>{
 e.preventDefault()
 
 setError('')

 const user = {
  name,
  email,
  password,

 }

 if (ConfirmPassword !== password) {
  setError('As senhas nao são iguais!')
  return
 }


  const res = await createUser(user)

}

useEffect(()=>{
  if(authError){
    setError(authError)
  }
})

  return (
    <div className={style.cadastre}>
         <section  className={style.createLogin}>
<div className={style.createLoginInfo}>
<h1>Cadastre-se</h1>
            <form onSubmit={handleSubmit}  className={style.createLoginForm}>
            <label>
               Nome
                <input 
                type="text"
                 name='name' 
                 value={name}
                 onChange={(e) =>{setName(e.target.value)}} />
              </label>
              <label>
                Email
                <input 
                type="email"
                 name='email' 
                 value={email}
                 onChange={(e) =>{setEmail(e.target.value)}} />
              </label>
              <label>
                Senha
                <input 
                type="password"
                 name='password' 
                 value={password}
                 onChange={(e) =>{setPassword(e.target.value)}} />
              </label>
              <label>
               Confirmar senha
                <input 
                type="password"
                 name='password' 
                 value={ConfirmPassword}
                 onChange={(e) =>{setConfirmPassword(e.target.value)}} />
                
              </label>

           {!loading &&   <input type="submit" value= "Enviar" />}
           {loading &&   <input type="submit" value= "Aguarde.." disable />}
              {error && <p>{error}</p>}
              {msg && <p>{msg}</p>}
            </form>
</div>
         
        </section>
        <section className={style.imageCreateLogin}> imagem</section>
     
    </div>
  )
}

export default CreateLogin