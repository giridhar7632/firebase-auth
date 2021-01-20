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
    /*
    return 
    // Step 1
    // User tries to sign in to Facebook.
    firebase.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).catch(function(error) {
      // An error happened.
      if (error.code === 'auth/account-exists-with-different-credential') {
        // Step 2.
        // User's email already exists.
        // The pending Facebook credential.
        var pendingCred = error.credential;
        // The provider account's email address.
        var email = error.email;
        // Get sign-in methods for this email.
        auth.fetchSignInMethodsForEmail(email).then(function(methods) {
          // Step 3.
          // If the user has several sign-in methods,
          // the first method in the list will be the "recommended" method to use.
          if (methods[0] === 'password') {
            // Asks the user their password.
            // In real scenario, you should handle this asynchronously.
            var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
            auth.signInWithEmailAndPassword(email, password).then(function(result) {
              // Step 4a.
              return result.user.linkWithCredential(pendingCred);
            }).then(function() {
              // Facebook account successfully linked to the existing Firebase user.
              goToApp();
            });
            return;
          }
          // All the other cases are external providers.
          // Construct provider object for that provider.
          // TODO: implement getProviderForProviderId.
          var provider = getProviderForProviderId(methods[0]);
          // At this point, you should let the user know that they already has an account
          // but with a different provider, and let them validate the fact they want to
          // sign in with this provider.
          // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
          // so in real scenario you should ask the user to click on a "continue" button
          // that will trigger the signInWithPopup.
          auth.signInWithPopup(provider).then(function(result) {
            // Remember that the user may have signed in with an account that has a different email
            // address than the first one. This can happen as Firebase doesn't control the provider's
            // sign in flow and the user is free to login using whichever account they own.
            // Step 4b.
            // Link to Facebook credential.
            // As we have access to the pending credential, we can directly call the link method.
            result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function(usercred) {
              // Facebook account successfully linked to the existing Firebase user.
              goToApp();
            });
          });
        });
      }
    });
    */
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
    signinWithFacebook
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
