import React, { createContext, useState, useEffect} from 'react'
import { auth} from '../../firebase'
import { GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged } from 'firebase/auth'



export interface IuserAuthProps {
    children: React.ReactNode
}

export interface IauthProps {

}

export const AuthContext = createContext({currentUser:"5",setCurrentUser:(currentUser:string) =>{}});

export const AuthProvider = ({children}:IuserAuthProps) => {
    const [currentUser, setCurrentUser] = useState(null)

    const provider = new GoogleAuthProvider()
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setCurrentUser(user)  
        })
        return unsubscribe
    }, [])


    function logout(): Promise<void> {
        return new Promise((resolve, reject) => {
            signOut(auth)
            .then(() => resolve())
            .catch((error) => reject(error));
        });
    };
    
    
    function login():void {
        signInWithRedirect(auth,provider)
    }



    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}