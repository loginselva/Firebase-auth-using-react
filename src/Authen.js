import React, { Component } from 'react';

var firebase = require("firebase");

var config = {
    apiKey: "AIzaSyDp5FY5zeEZ9uPyTsR3jhZl-QVZ-tHbYjo",
    authDomain: "fir-login-react-ae0ef.firebaseapp.com",
    databaseURL: "https://fir-login-react-ae0ef.firebaseio.com",
    projectId: "fir-login-react-ae0ef",
    storageBucket: "fir-login-react-ae0ef.appspot.com",
    messagingSenderId: "607166991146"
  };
  firebase.initializeApp(config);

class Authen extends Component {
  constructor(props){
          super(props);

          this.state = {
            err:''
          };
          this.login = this.login.bind(this);
          this.signin = this.signin.bind(this);
          this.logout = this.logout.bind(this);
        }

  login(){
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email+" "+password);

    const promise = firebase.auth().signInWithEmailAndPassword(email, password);

    promise
    .then(user=>{
      var err = 'welcome '+user.email;
      this.setState({err});
      var log_out = document.getElementById("logout");
      log_out.classList.remove('hide');
      console.log('Logged in success')
    })
    .catch(e=>{
      var err = e.message;
      this.setState({err});
      console.log('Logged in success')
    });


  }

  signin() {
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email+" "+password);

    const promise = firebase.auth().createUserWithEmailAndPassword(email, password);

    promise
    .then(user=>{
      firebase.database().ref("users/"+user.uid).set({
        email: user.email
      })
      var err = 'Welcome '+user.email;
      this.setState({err});
      var log_out = document.getElementById("logout");
      log_out.classList.remove('hide');
    })
    .catch(e=>{
      var err = e.message;
      this.setState({err});
    });

  }

  logout() {
    const promise = firebase.auth().signOut();

    var err = 'Logged out successfully';
    this.setState({err});
    console.log('logged out successfully');

    var log_out = document.getElementById("logout");
    log_out.classList.add('hide');
  }


  render(){
    return (
      <div>
          <input type="email" id="email" placeholder="Enter ur email" ref="email" /><br/>
          <input type="password" id="pass" placeholder="Enter ur password" ref="password" /><br/>
          <p>{this.state.err}</p>
          <button onClick={this.login} >Login</button>
          <button onClick={this.signin}>Sign In</button>
          <button id="logout" className="hide" onClick={this.logout}>Logout</button>
      </div>
    );
  }
}


export default Authen;
