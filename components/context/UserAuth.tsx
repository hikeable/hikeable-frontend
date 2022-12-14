import React, {ReactNode, useEffect, useState, useContext, createContext, use, useRef } from 'react'
import { auth} from '../../firebase'
import { Auth, UserCredential, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail,GoogleAuthProvider,signInWithPopup, getAuth, signOut } from 'firebase/auth'
import axios from 'axios'
import { UserInfo } from 'os'

export interface AuthProviderProps {
  children?: ReactNode
};


export interface AuthContextModel {
  auth: Auth
  user: User | null
  signIn: (email: string, password: string) => Promise<UserCredential>
  signUp: (email: string, password: string) => Promise<UserCredential>
  sendPasswordResetEmail?: (email: string) => Promise<void>
  loginWithGoogle: () => void
  logout: (auth:Auth) =>void
  userId:number | undefined
};

export const AuthContext = React.createContext<AuthContextModel>(
  {} as AuthContextModel,
);

export function useAuth(): AuthContextModel {
  return useContext(AuthContext)
};

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const provider = new GoogleAuthProvider();
  const [userId, setUserId] = useState<number | undefined>(undefined)

  
  // let userId:number | undefined


  function signUp(email: string, password: string): Promise<UserCredential> {;
    return createUserWithEmailAndPassword(auth, email, password)
  };
  function signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
  };
  function resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(auth, email);
  };   
  function loginWithGoogle() { 
    const auth = getAuth();

    signInWithPopup(auth, provider).then(result => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;

        console.log("google auth sucesss", {result, user})
    }) .catch(error => {
        const erroCode = error.code;
        const errMessage = error.message;

        console.log("google auth error", erroCode, errMessage);
    } )
  };

  function logout() {
    const auth = getAuth()
    signOut(auth)
  };

 
  const postUid = async () => {
    // console.log("????????????", user?.uid);
    const payload = {firebase_uid:user?.uid}
    // console.log(payload,"??????????????????")
    try {
        const resp = await axios.post("https://hikeable-backend.herokuapp.com/api/users", payload);
        // console.log (resp,"????????????")
    } catch (err) {
        console.error(err);
    }

    try {
      const resp = await axios.get("https://hikeable-backend.herokuapp.com/api/users");
      // console.log (resp,"????????????")
      resp.data.map((account) => {
        // console.log (account)
        if (account.firebase_uid === user?.uid){
          setUserId(account.id)
          // console.log (userId)
        }
        // if (account.includes(user?.uid)){
        //   userId=account.id
        //   console.log(userId,account)
        // }
      })
      
    } catch (err) {
      console.error(err);
    }
  };

  postUid();
  


  useEffect(() => {
    //function that firebase notifies you if a user is set
    const unsubsrcibe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })
    return unsubsrcibe
  }, []);


  const values = {
    signUp,
    user,
    signIn,
    resetPassword,
    auth,
    loginWithGoogle,
    logout,
    userId
    
  };
  
  return <AuthContext.Provider value={values}>
    {children}
    </AuthContext.Provider>
};

// export const useUserContext = (): UserContextState => {
//   return useContext(UserStateContext)
// };