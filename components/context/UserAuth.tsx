import React, { ReactNode, useEffect, useState, useContext } from "react";
import { auth } from "../../firebase";
import {
  Auth,
  UserCredential,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
} from "firebase/auth";
import axios from "axios";

type TAccount = {
  id: number;
  firebase_uid: string;
};

export interface AuthProviderProps {
  children?: ReactNode;
}

export interface AuthContextModel {
  auth: Auth;
  user: User | null;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  sendPasswordResetEmail?: (email: string) => Promise<void>;
  loginWithGoogle: () => void;
  logout: (auth: Auth) => void;
  userId: number | undefined;
}

export const AuthContext = React.createContext<AuthContextModel>(
  {} as AuthContextModel
);

export function useAuth(): AuthContextModel {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const provider = new GoogleAuthProvider();
  const [userId, setUserId] = useState<number | undefined>(undefined);

  function signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(auth, email);
  }
  function loginWithGoogle() {
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function logout() {
    const auth = getAuth();
    signOut(auth);
  }

  const postUid = async () => {
    const payload = { firebase_uid: user?.uid };

    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/users`,
        payload
      );
    } catch (error) {
      console.error(error);
    }

    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/users`
      );

      resp.data.map((account: TAccount) => {
        if (account.firebase_uid === user?.uid) {
          setUserId(account.id);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  postUid();

  useEffect(() => {
    const unsubsrcibe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubsrcibe;
  }, []);

  const values = {
    signUp,
    user,
    signIn,
    resetPassword,
    auth,
    loginWithGoogle,
    logout,
    userId,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
