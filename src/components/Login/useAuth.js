import React, { useEffect } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from 'react';
import { Route, Redirect } from "react-router-dom";



firebase.initializeApp(firebaseConfig);

const AuthContex = createContext();

export const AuthContexProvider = (props) => {
    const auth = Auth();
    return <AuthContex.Provider value={auth}>{props.children}</AuthContex.Provider>
}

export const useAuth = () => {
    return useContext(AuthContex);
}

export const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

const getUser = user => {
    const {displayName, email, photoURL} = user;
   return {name: displayName, email, photo: photoURL}
}

const Auth = () => {
    const[user, setUser] =useState(null);

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
        .then(res => {
            const signedInUser = getUser(res.user);
            setUser(signedInUser);
            return res.user;
        })
        .catch(err => {
            setUser(null);
            return err.message;
        })
    }
    const signOut = () => {
        return firebase.auth().signOut().then(function() {
            setUser(null);
            return true;
          }).catch(function(error) {
            return false;
          });
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(usr) {
            if (usr) {
                const cuurentUser = getUser(usr);
                setUser(cuurentUser);
            }
            else {

            }
        });
    }, [])


    return {
        user,
        signInWithGoogle,
        signOut
    }
}

export default Auth;