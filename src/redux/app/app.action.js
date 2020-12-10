import firebase from 'firebase';

import { appTypes } from './app.types';
import { firestore as db } from '../../firebase';
import { cleanDate } from '../../utils/utilFn';
import { persistor } from '../store';

export const initialDataFetch = () => async (dispatch, getState) => {
  const { uid } = getState().firebase.auth;

  const getMonth = cleanDate(new Date(), 'MM');
  const getYear = cleanDate(new Date(), 'YYYY');

  await db
    .doc(`users/${uid}`)
    .get()
    .then(async (el) => {
      console.log('El', el.data());

      const dispatchObj = { ...el.data() };

      if (el.data().todoRefByMonth) {
        if (
          Object.keys(el.data().todoRefByMonth).length > 0 &&
          !!el.data().todoRefByMonth[`${getMonth}-${getYear}`]
        ) {
          const monthEntry = el.data().todoRefByMonth[`${getMonth}-${getYear}`];
          const todoDocRef = db.doc(`todos-col/${monthEntry.id}`);
          const todoDataSnapShot = await todoDocRef.get();

          console.log(
            'todoDataSnapShot',
            todoDataSnapShot.data().todoListByDate
          );

          dispatchObj.todoListByDateData = todoDataSnapShot.data()
            .todoListByDate
            ? {
                [`${getMonth}-${getYear}`]: todoDataSnapShot.data()
                  .todoListByDate,
              }
            : {};
        }
      }

      dispatch({
        type: appTypes.INITIAL_DATA_FETCH,
        payload: dispatchObj,
      });
    })
    .catch((err) => console.log('There was some error', err));
};

export const selectedDateChange = (date) => (dispatch, getState) => {
  dispatch({
    type: appTypes.SELECTED_DATE_CHANGE,
    payload: date,
  });
};

export const fetchDataByDate = (todoDate) => async (dispatch, getState) => {
  console.log('TodoDate', todoDate);
};

export const userLogout = () => {
  persistor.purge();
  firebase.logout();

  return {
    type: appTypes.USER_LOGOUT,
  };
};
