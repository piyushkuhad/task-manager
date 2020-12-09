//import firebase from 'firebase';

import { todoTypes } from './todo.types';
import { firestore as db } from '../../firebase';
import cloneDeep from 'lodash/cloneDeep';
import { cleanDate } from '../../utils/utilFn';

// const addDocToUserCol = async (formValues, docRef, uid) => {
//   const todoString = `todos.${formValues.taskTime.split('T')[0]}`;

//   await db.doc(`users/${uid}`).update({
//     [todoString]: firebase.firestore.FieldValue.arrayUnion(docRef),
//   });
// };

export const createTodo = (data) => async (dispatch, getState) => {
  try {
    const formObj = cloneDeep(data);

    //const onlyDate = formObj.taskTime.split('T')[0];

    const onlyDate = formObj.taskTime;

    const getDate = cleanDate(onlyDate, 'DD');
    const getMonth = cleanDate(onlyDate, 'MM');
    const getYear = cleanDate(onlyDate, 'YYYY');

    const monthEntry = getState().todos.todosRefByMonth[
      `${getMonth}-${getYear}`
    ];

    console.log('monthEntry', !!monthEntry);

    //FIRST
    //Todo Document For Month Exists in todo-col collection
    if (!!monthEntry) {
      console.log('monthEntry Id', monthEntry.id);

      //Reference to doc in todo-col Collection
      const todoDocRef = db.doc(`todos-col/${monthEntry.id}`);
      const todoDataSnapShot = await todoDocRef.get();

      console.log('todoDataSnapShot', todoDataSnapShot.data().todoListByDate);

      //Check if Field with getDate variable exists else create one
      if (todoDataSnapShot.data().todoListByDate[getDate]) {
        console.log('Exists');
        const timeNow = Date.now();
        const todoString = `todoListByDate.${getDate}.${timeNow}`;

        await todoDocRef.update({
          [todoString]: formObj,
        });
      } else {
        console.log("Doesn't Exists");
      }
    }

    //SECOND
    else {
      console.log('Entry does not exist');
      //If Document for given month does not exist then create new entry in todo-col collection
      const { uid } = getState().firebase.auth;
      const timeNow = Date.now();
      const todoColRef = db.collection('todos-col');
      let createdDocRef;

      await todoColRef.doc(`${uid}&${getMonth}${getYear}`).set({
        todoListByDate: {
          [getDate]: { [timeNow]: formObj },
        },
      });

      const getRef = await todoColRef.doc(`${uid}&${getMonth}${getYear}`).get();

      createdDocRef = await getRef.ref;

      // .then(async () => {
      //   const getRef = await todoColRef
      //     .doc(`${uid}&${getMonth}${getYear}`)
      //     .get();
      //   return getRef.ref;
      // })
      // .then(async (getRef) => {
      //   const todoMonthString = `todoRefByMonth.${getMonth}-${getYear}`;
      //   createdDocRef = getRef;

      //Dispatching 'Create todo new month' action so as to avoid "@@reactReduxFirebase/SET_PROFILE"
      //running first since it runs when we make requet to users collection below causing
      //inconsistency in todo state

      //Create entry for new month in todoRefByMonth in user Collection
      // db.doc(`users/${uid}`).update({
      //   [todoMonthString]: getRef,
      // });
      //});

      //Create entry for new month in todoRefByMonth in user Collection
      const todoMonthString = `todoRefByMonth.${getMonth}-${getYear}`;
      await db.doc(`users/${uid}`).update({
        [todoMonthString]: createdDocRef,
      });

      await dispatch({
        type: todoTypes.CREATE_TODO_NEW_MONTH,
        payload: {
          todosMonthRef: { [`${getMonth}-${getYear}`]: createdDocRef },
          todosByMonthData: {
            [`${getMonth}-${getYear}`]: {
              [getDate]: { [timeNow]: formObj },
            },
          },
          selectedDate: {
            selectedDay: getDate,
            selectedMonth: getMonth,
            selectedYear: getYear,
          },
        },
      });
    }
    //SECOND END
  } catch (err) {
    console.log('Error', err);
  }

  // console.log('Form Data', formObj);

  // const todosRef = db.collection('todos');
  // try {
  //   const docRef = await todosRef.add(formObj);

  //   const dispatchObj = await { ...formObj, _id: docRef.id };

  //   await addDocToUserCol(formObj, docRef, formObj.userId);

  //   dispatch({
  //     type: todoTypes.CREATE_TODO,
  //     payload: dispatchObj,
  //   });
  // } catch (err) {
  //   console.log('Error', err);
  // }
};

export const getTodoList = () => async (dispatch, getState) => {
  await db
    .collection('todos')
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((el) => console.log(el.data()))
    )
    .catch((err) => console.log('Error!!', err));

  dispatch({
    type: todoTypes.GET_TODO_LIST,
  });
};

export const getTodo = (id) => ({
  type: todoTypes.GET_TODO,
});

export const editTodo = (data) => ({
  type: todoTypes.EDIT_TODO,
  payload: data,
});

export const deleteTodo = (id) => ({
  type: todoTypes.DELETE_TODO,
});
