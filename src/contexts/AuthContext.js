import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signUp(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }
  function login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  function logout() {
    return firebase.auth().signOut();
  }
  function resetPassword(email) {
    return firebase.auth().sendPasswordResetEmail(email);
  }
  /*
  // update account

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }
  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  TODO: Add {
    updateEmail,
    updatePassword
  } to value
  */
  function signinWithGitHub() {
    setLoading(true);
    return firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider())
  }
  function signinWithGoogle() {
    setLoading(true);
    return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }
  function signinWithFacebook() {
    setLoading(true);
    return firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
  }
  function signinAnonymously() {
    return firebase.auth().signInAnonymously()
  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    signUp,
    login,
    logout,
    resetPassword,
    signinWithGitHub,
    signinWithGoogle,
    signinWithFacebook,
    signinAnonymously
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
