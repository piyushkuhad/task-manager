import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Lottie from 'react-lottie';

import animationData from '../../assets/animation/send-mail.json';
import { emailVerification } from '../../redux/app/app.action';
import './VerifyEmail.styles.scss';

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.firebase.profile);
  const [emailStatus, setEmailStatus] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(true);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const sendVerificationMail = () => {
    dispatch(emailVerification());
    setEmailStatus(true);
    setIsPaused(false);
  };

  const checkVerification = () => {
    window.location.reload();
  };

  return (
    <div className="cm-verify-email-container box-shadow-2">
      <div className="cm-verify-email-header">
        <Lottie
          options={defaultOptions}
          height={150}
          width={150}
          isPaused={isPaused}
        />
        <h2>Email Verification</h2>
      </div>
      <p>
        Hi, <strong>{userProfile.displayName}</strong>
      </p>
      <p>
        Thank you for signing up. We're glad to have you here. Just one more
        step, before using Todo-App.
      </p>
      <p>We would like you to verify your email address.</p>
      {!emailStatus ? (
        <Button
          variant="contained"
          color="primary"
          onClick={sendVerificationMail}
        >
          Verify Email
        </Button>
      ) : (
        <>
          <p>
            A verification mail with a link has been sent to your registered
            email account. Click on that link and on success click below button.
          </p>
          <Button
            variant="contained"
            color="primary"
            onClick={checkVerification}
          >
            Verified ?
          </Button>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
