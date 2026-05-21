import {
    createContext,
    useState,
    useEffect,
    } from "react";
    
    import {
    auth
    } from "../firebase";
    
    import {
    
    createUserWithEmailAndPassword,
    
    signInWithEmailAndPassword,
    
    signOut,
    
    onAuthStateChanged,
    
    updateProfile,
    
    } from "firebase/auth";
    
    export const AuthContext =
    createContext();
    
    const AuthProvider =
    ({ children }) => {
    
    const [
    user,
    setUser
    ] =
    useState(null);
    
    const signup =
    async (
    name,
    email,
    password
    )=>{
    
    const res =
    
    await createUserWithEmailAndPassword(
    auth,
    email,
    password
    );
    
    await updateProfile(
    res.user,
    {
    displayName:
    name
    }
    );
    
    return res;
    
    };
    
    const login =
    (
    email,
    password
    )=>
    
    signInWithEmailAndPassword(
    auth,
    email,
    password
    );
    
    const logout =
    ()=>
    
    signOut(
    auth
    );
    
    useEffect(()=>{
    
    const unsub =
    
    onAuthStateChanged(
    
    auth,
    
    (current)=>{
    
    setUser(
    current
    );
    
    }
    
    );
    
    return ()=>unsub();
    
    },[]);
    
    return(
    
    <AuthContext.Provider
    
    value={
    
    {
    
    user,
    
    signup,
    
    login,
    
    logout,
    
    }
    
    }
    
    >
    
    {children}
    
    </AuthContext.Provider>
    
    );
    
    };
    
    export default
    AuthProvider;