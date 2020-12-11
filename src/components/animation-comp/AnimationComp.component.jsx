import React from 'react';
import Lottie from 'react-lottie';

const AnimationComp = ({ animationData, width, height, text }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="cm-animation-container">
      <Lottie options={defaultOptions} height={height} width={width} />
      {text ? <h1>{text}</h1> : null}
    </div>
  );
};

AnimationComp.defaultProps = {
  width: 400,
  height: 400,
  text: null,
};

export default AnimationComp;
