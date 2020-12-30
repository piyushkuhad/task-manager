import React from 'react';
//import { firestore as db, auth } from '../../firebase';

import { useFirebase } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import gradientAnimData from '../../assets/animation/gradient-lines.json';
import animationData from '../../assets/animation/auth-anim.json';
import AnimationComp from '../animation-comp/AnimationComp.component';
import './SignIn.styles.scss';
import { showSnackbar } from '../../redux/app/app.action';

const SignIn = () => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const history = useHistory();
  const [formValues, setFormValues] = React.useState({
    formType: 'login',
    fullName: '',
    loginEmail: '',
    loginPassword: '',
  });

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

  // const createUserDoc = async (user) => {
  //   console.log('USer is:', user);
  //   if (!user) return;

  //   const userRef = db.collection('users');
  //   const userSnapShot = await userRef.get();
  //   console.log('User SnapShot', userSnapShot.exists);

  //   try {
  //     await userRef.doc(user.id).set({
  //       displayName: formValues.fullName,
  //       todosRefByMonth: {},
  //       todos: {},
  //       userPriorities: [],
  //       userTags: [],
  //       accountType: 'custom',
  //     });
  //   } catch (err) {
  //     console.log('Error createUserDoc!!', err);
  //   }
  // };

  const onAuthFormSubmit = async () => {
    console.log('Form Values', formValues);
    try {
      if (formValues.formType === 'signUp') {
        // const { user } = await auth.createUserWithEmailAndPassword(
        //   formValues.loginEmail,
        //   formValues.loginPassword
        // );
        //await createUserDoc(user);

        //Create New User
        const email = formValues.loginEmail;
        const password = formValues.loginPassword;
        const displayName = formValues.fullName;
        firebase
          .createUser(
            { email, password },
            {
              displayName,
              email,
              todoRefByMonth: {},
              todos: {},
              userPriorities: [],
              userTags: [],
              avatarUrl: null,
              accountType: 'custom',
            }
          )
          .then(() => {
            dispatch(
              showSnackbar({
                message: 'Account created!',
                severity: 'success',
              })
            );
          })
          .catch((err) => {
            console.log('Err', err);
            let errMsg = 'Unable to create account. Please try again.';
            if (err.code === 'auth/email-already-in-use') errMsg = err.message;

            dispatch(
              showSnackbar({
                message: errMsg,
                severity: 'error',
              })
            );
          });
      }

      if (formValues.formType === 'login') {
        firebase
          .login({
            email: formValues.loginEmail,
            password: formValues.loginPassword,
          })
          .then(() =>
            dispatch(
              showSnackbar({
                message: 'Login Successfull',
                severity: 'success',
              })
            )
          )
          .catch((err) => {
            let errMsg = 'Error Logging-in';
            if (err.code === 'auth/user-not-found')
              errMsg = 'User does not exist.';
            if (err.code === 'auth/wrong-password')
              errMsg = 'Incorrect login credentials.';
            dispatch(showSnackbar({ message: errMsg, severity: 'error' }));
          });
      }
    } catch (err) {
      console.log('Auth Error', err);
    }
  };

  const onFieldChange = (e) => {
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const changeAuthState = () => {
    //setAuthState((prevState) => (prevState === 'login' ? 'signUp' : 'login'));
    setFormValues((prevState) => ({
      ...prevState,
      formType: prevState.formType === 'login' ? 'signUp' : 'login',
    }));
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
          {formValues.formType === 'signUp' ? (
            <div className="cm-form-field">
              <TextField
                label="Full Name"
                variant="outlined"
                type="fullName"
                name="fullName"
                fullWidth
                autoFocus
                onChange={(e) => onFieldChange(e)}
                value={formValues.fullName}
              />
            </div>
          ) : null}
          <div className="cm-form-field">
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              name="loginEmail"
              fullWidth
              onChange={(e) => onFieldChange(e)}
              value={formValues.loginEmail}
            />
          </div>
          <div className="cm-form-field">
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              name="loginPassword"
              fullWidth
              onChange={(e) => onFieldChange(e)}
              value={formValues.loginPassword}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            className="cm-auth-form-btn"
            onClick={() => onAuthFormSubmit()}
          >
            {formValues.formType === 'login' ? 'Login' : 'Sign Up'}
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="cm-auth-form-btn"
            onClick={() => changeAuthState()}
          >
            {formValues.formType === 'login' ? 'SignUp' : 'Login'}
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
