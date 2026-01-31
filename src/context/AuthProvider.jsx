import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../Autentication/firebase.config';
import { GoogleAuthProvider } from 'firebase/auth';

const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
const [ user, setUser] = useState(null)
const [loading , setLoading] =useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

const singInUser = (email, password) =>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
}

const signInWithGoogle = () =>{
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
}

const handleSignOut = () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out");
    })
    .catch((error) => {
      console.error(error);
    });
};

useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(currentUser) => {
        setUser(currentUser)
        setLoading(false)
    }) 
    return () => {
        unsubscribe()
    }
},[])

    const authInfo ={
createUser,
singInUser,
signInWithGoogle,
handleSignOut,
user,
loading
    }
    return (
       <AuthContext value={authInfo}>
        {children}
       </AuthContext>
    );
};

export default AuthProvider;