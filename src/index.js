import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';

import './index.scss';
import { store, persistor } from './redux/store';
import { rrfPropsHalf } from './firebase';
import App from './App';

//import reportWebVitals from './reportWebVitals';

const rrfProps = {
  ...rrfPropsHalf,
  dispatch: store.dispatch,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          {/* <MuiThemeProvider theme={theme}> */}
          <App />
          {/* </MuiThemeProvider> */}
        </ReactReduxFirebaseProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
