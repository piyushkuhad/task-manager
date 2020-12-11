import React from 'react';
import { useFirebase } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import gradientAnimData from '../../assets/animation/gradient-lines.json';
import animationData from '../../assets/animation/auth-anim.json';
import AnimationComp from '../animation-comp/AnimationComp.component';
import './SignIn.styles.scss';

const SignIn = () => {
  const firebase = useFirebase();
  const history = useHistory();

  const signInWithGoogle = () => {
    firebase
      .login({
        provider: 'google',
        type: 'popup',
      })
      .then(() => {
        history.push('/');
      });
  };

  return (
    <div className="cm-auth-container cm-flex-type-1">
      <div className="cm-left-col box-shadow-2">
        <h1>Todo App</h1>
        <form className="cm-auth-form">
          <Button
            variant="contained"
            className="login-with-google-btn"
            onClick={(e) => {
              e.preventDefault();
              signInWithGoogle();
            }}
          >
            Sign In with Google
          </Button>
          <div className="cm-form-field">
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              name="loginEmail"
              fullWidth
            />
          </div>
          <div className="cm-form-field">
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              name="loginPassword"
              fullWidth
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            className="cm-auth-form-btn"
          >
            Login
          </Button>
        </form>
      </div>
      <div className="cm-right-col cm-flex-type-2">
        <h2>
          "Every day’s to-do list. <br />
          Listen, Trust and Do."
        </h2>
        <AnimationComp animationData={animationData} width={500} height={500} />
        <div className="cm-bg-anim">
          <AnimationComp
            animationData={gradientAnimData}
            width={'100%'}
            height={'70%'}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
