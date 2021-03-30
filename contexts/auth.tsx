import { createContext, useState, useEffect, useContext } from "react";
import firebase from "utils/firebase";
import nookies from "nookies";

interface Auth {
  userId: string;
  signIn: (email: string, password: string) => Promise<firebase.User>;
  signUp: (email: string, password: string) => Promise<firebase.User>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<Auth | null>(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useProvideAuth() {
  const [user, setUser] = useState<firebase.User | null>(null);

  const signIn = async (email: string, password: string) => {
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    setUser(userCredential.user);
    return userCredential.user;
  };

  const signUp = async (email: string, password: string) => {
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    setUser(userCredential.user);
    return userCredential.user;
  };

  const signOut = async () => {
    await firebase.auth().signOut();
    setUser(null);
  };

  useEffect((): firebase.Unsubscribe => {
    if (typeof window !== "undefined") {
      (window as any).nookies = nookies;
    }
    const unsubscribe = firebase.auth().onIdTokenChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setUser(user);
        nookies.destroy(null, "token");
        nookies.set(null, "token", token, { path: "/" });
      } else {
        setUser(null);
        nookies.destroy(null, "token");
        nookies.set(null, "token", "", { path: "/" });
      }
    });
    return unsubscribe;
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebase.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  return {
    userId: user?.uid,
    signIn,
    signUp,
    signOut,
  };
}
