import { db } from "../firebase/config"

// IMPORTANTO  FUNÇOES DO FIREBASE
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut, GoogleAuthProvider, signInWithPopup,sendEmailVerification,emailVerified
} from 'firebase/auth'

import { useState, useEffect } from "react"

import { useAuthValue } from "../Context/authContext"


export const useAuthentication = () => {

  


    // TRATAMENTO DE ERROR ,LOADING e REDIRECIONAMENTO
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const [msg, setMsg] = useState()

    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    const [redirect, setRedirect] = useState(0)

    // CLEAN UP PARA NAO TER ESCAPE DE MEMORIA DE INFORMAÇOES
    function checkIfisCancelled() {
        if (cancelled) {
            return
        }
    }

    // FUNÇAO DE ENVIO E AUTHENTIFICAÇÃO
    const createUser = async (data) => {
        checkIfisCancelled()

        setLoading(true)
        setError(null)

        
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )


            await sendEmailVerification(user).then(()=>{
                setMsg('Foi enviado um email de verificação para este email')
            })
            .catch((error)=>{
                console.log('Erro ai enviar', error)
            })

          
            
            // ATUALIZANDO NAME 
            await updateProfile(user, {
                displayName: data.name
            })

            // ENVIANDO MEU USUARIO PARA O LOGIN  
            setTimeout(function() {
                setRedirect(2)
              }, 3000);

             
        } catch (error) {

            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage

            if (error.message.includes('Password')) {
                systemErrorMessage = 'A senha precisa ter no minimo 6 caracteres'
            }
            else if (error.message.includes('email-already')) {
                systemErrorMessage = "E-mail ja cadastrado"
            }
            else {
                systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde!"
            }

            setError(systemErrorMessage)
        }

        setLoading(false)

    }

    
  

    // CONFIRMAÇÂO DE EMAIL
  


    
  const logout = () => {
    checkIfisCancelled()

    signOut(auth);
  };

    //  LOGIN 


    const login = async (data) => {
        checkIfisCancelled()

        setLoading(true)
        setError(null)
        

        try {
            await signInWithEmailAndPassword(
                auth,
                data.email,
                data.senha
            )
            
                 setRedirect(1)
                
        } catch (error) {

            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage

            if (error.message.includes('user-not-found')) {
                systemErrorMessage = 'Usuario não encontrado'
            }
            else if (error.message.includes('auth/missing-password')) {
                systemErrorMessage = "senha incorreta!"
            }
            else if (error.message.includes('auth/wrong-password')) {
                systemErrorMessage = "senha incorreta!"
            }
            else {
                systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde!"
            }

            setError(systemErrorMessage)
        }

        setLoading(false)
    }

    // GOOGLE LOGAR

const GoogleLogar = async () =>{
    const provider = new GoogleAuthProvider();   
        const result = await signInWithPopup(auth, provider);
        setRedirect(1)
        return result;
      
  
}




    useEffect(() => {
        return () => setCancelled(true)
    }, [])



    return {
        auth,
        createUser,
        error,
        loading,
        login,
        redirect,
        msg,
        logout,
        GoogleLogar,
        
    }
}