import {auth} from "../services/firebaseConnection"
import { onAuthStateChanged } from "firebase/auth"
import { useState, type ReactNode, useEffect } from "react"
import { Navigate } from "react-router-dom"



interface childrenProps {
    children: ReactNode
}


export function Private({children}: childrenProps): any {
    const [loading, setLoading] = useState(true)
    const [signed, setSigned] = useState(false)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user)=> {
            if(user) {
                const userData = {
                    uid: user.uid,
                    email: user.email,
                }


                localStorage.setItem("@reactlinks", JSON.stringify(userData))
                setLoading(false)
                setSigned(true)

            } else{
                setLoading(false)
                setSigned(false)
            }
        })

        return() => {
            unsub()
        }
    }, [])

    if(loading){
        return(
            <div className="h-screen">
                <h1>Carregando...</h1>
            </div>
        )
    }


    if(!signed) {
        return <Navigate to="/login"/>
    }
    return children;
    
    }