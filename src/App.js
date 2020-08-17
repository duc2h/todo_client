import React, { useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import "./App.css";
import SignIn from "./Sign-In";
import ToDoList from "./To-Do-List";
import firebase from 'firebase';


// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // ...
};
firebase.initializeApp(config);

function App() {

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => {
        if (!user){
          console.log("user is not login")
          return;
        }
        console.log(user)
      }
    );

    return () => unregisterAuthObserver();
  }, []);


  return (
    <div>
       
       <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/todos" />

            <Route path="/todos" component={ToDoList} />
            <Route path="/sign-in" component={SignIn} />
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;