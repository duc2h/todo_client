import firebase from "firebase";
import React, { Component } from "react";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

class SignIn extends Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return (
    <div>
      <h1 className="text-center">Login</h1>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
    </div>
    )
  }
}

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'redirect',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/todos',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ]
};

export default SignIn