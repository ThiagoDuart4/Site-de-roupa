import { db } from "../firebase/config"

// IMPORTANTO  FUNÇOES DO FIREBASE
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from "react"


export const useAuthentication = () => {

 

    // TRATAMENTO DE ERROR ,LOADING e REDIRECIONAMENTO
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    const [msg, setMsg] = useState()

    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    const [redirect, setRedirect] = useState()

    console.log(redirect)
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
            // ATUALIZANDO NAME 
            await updateProfile(user, {
                displayName: data.name
            })

            setMsg('Usuario criado com sucesso')

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
    // LOGOUT

    
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
            
                 setRedirect(true)
                
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
            else {
                systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde!"
            }

            setError(systemErrorMessage)
        }

        setLoading(false)
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
        logout
    }
}