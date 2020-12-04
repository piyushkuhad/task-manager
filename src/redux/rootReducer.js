import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import todoReducer from './todo/todo.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['firebase', 'firestore'],
};

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  todos: todoReducer,
});

export default persistReducer(persistConfig, rootReducer);
