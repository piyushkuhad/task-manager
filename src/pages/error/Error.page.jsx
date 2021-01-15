import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import notFound from '../../assets/animation/not-found.json';
import AnimationComp from '../../components/animation-comp/AnimationComp.component';

import './Error.styles.scss';

const ErrorPage = () => {
  return (
    <div className="cm-error-page-container cm-flex-type-2">
      <div className="page-center cm-flex-type-1">
        <div className="cm-error-content">
          <h1>404</h1>
          <h3>Unable to reach Destination.</h3>
          <Button component={Link} to="/" variant="contained" color="primary">
            Take me Home
          </Button>
        </div>
        <div className="cm-error-anim" style={{ width: 500, height: 500 }}>
          <AnimationComp animationData={notFound} width="500" height="500" />
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
