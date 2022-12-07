import React, {ReactNode, useEffect, useState, useContext, createContext, use } from 'react'
import { auth} from '../../firebase'
import { Auth, UserCredential, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail,GoogleAuthProvider,signInWithPopup, getAuth, signOut } from 'firebase/auth'

export interface AuthProviderProps {
  children?: ReactNode
};

export interface UserContextState {
  isAuthenticated: boolean
  isLoading: boolean
  id?: string
};

export const UserStateContext = createContext<UserContextState>(
  {} as UserContextState,
);
export interface AuthContextModel {
  auth: Auth
  user: User | null
  signIn: (email: string, password: string) => Promise<UserCredential>
  signUp: (email: string, password: string) => Promise<UserCredential>
  sendPasswordResetEmail?: (email: string) => Promise<void>
  loginWithGoogle: () => void
  logout: (auth:Auth) =>void
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
        
    }).catch(error => {
        const erroCode = error.code;
        const errMessage = error.message;

        console.log("google auth error", erroCode, errMessage);
    } )
  };

  function logout() {
    const auth = getAuth()
    signOut(auth)
    console.log(user)
  }

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
    logout
  }
  
  return <AuthContext.Provider value={values}>
    {children}
    </AuthContext.Provider>
};

export const useUserContext = (): UserContextState => {
  return useContext(UserStateContext)
};