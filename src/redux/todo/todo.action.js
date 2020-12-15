import firebase from 'firebase';

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

        //When another Todo is created on same Date.
        dispatch({
          type: todoTypes.CREATE_TODO_WITHIN_DATE,
          payload: {
            // todosByMonthData: {
            //   [`${getMonth}-${getYear}`]: {
            //     [getDate]: { [timeNow]: formObj },
            //   },
            // },
            todoByMonthData: { [timeNow]: formObj },
            selectedDate: {
              selectedDay: getDate,
              selectedMonth: getMonth,
              selectedYear: getYear,
            },
          },
        });
      } else {
        console.log("Date Doesn't Exists but month does");
        const timeNow = Date.now();
        const todoString = `todoListByDate.${getDate}.${timeNow}`;
        await todoDocRef.update({
          [todoString]: formObj,
        });

        dispatch({
          type: todoTypes.CREATE_TODO_WITHIN_DATE,
          payload: {
            todoByMonthData: { [timeNow]: formObj },
            selectedDate: {
              selectedDay: getDate,
              selectedMonth: getMonth,
              selectedYear: getYear,
            },
          },
        });
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

      console.log('Yo:', await todoColRef.doc(`${uid}&${getMonth}${getYear}`));

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

export const completedTask = (data, completedBool) => async (
  dispatch,
  getState
) => {
  try {
    //console.log('Data', data);
    const formObj = cloneDeep(data);
    const onlyDate = formObj.taskTime;
    const getId = formObj._id;
    const getDate = cleanDate(onlyDate, 'DD');
    const getMonth = cleanDate(onlyDate, 'MM');
    const getYear = cleanDate(onlyDate, 'YYYY');
    const { uid } = getState().firebase.auth;

    const todoUpdateString = `todoListByDate.${getDate}.${getId}.completed`;

    await db.doc(`todos-col/${uid}&${getMonth}${getYear}`).update({
      [todoUpdateString]: completedBool,
    });

    formObj.completed = completedBool;

    dispatch({
      type: todoTypes.COMPLETED_TASK,
      payload: {
        todosByMonthData: {
          [`${getMonth}-${getYear}`]: {
            [getDate]: { [getId]: formObj },
          },
        },
        selectedDate: {
          selectedDay: getDate,
          selectedMonth: getMonth,
          selectedYear: getYear,
        },
      },
    });
  } catch (err) {
    console.log('Error!!', err);
  }
};

export const getTodo = (id) => ({
  type: todoTypes.GET_TODO,
});

export const editTodo = (data) => ({
  type: todoTypes.EDIT_TODO,
  payload: data,
});

export const deleteTodo = (data) => async (dispatch, getState) => {
  try {
    const onlyDate = data.taskTime;
    const getId = data._id;
    const getDate = cleanDate(onlyDate, 'DD');
    const getMonth = cleanDate(onlyDate, 'MM');
    const getYear = cleanDate(onlyDate, 'YYYY');
    const { uid } = getState().firebase.auth;

    const todoUpdateString = `todoListByDate.${getDate}.${getId}`;

    await db.doc(`todos-col/${uid}&${getMonth}${getYear}`).update({
      [todoUpdateString]: firebase.firestore.FieldValue.delete(),
    });

    dispatch({
      type: todoTypes.DELETE_TODO,
      payload: {
        // todosByMonthData: {
        //   [`${getMonth}-${getYear}`]: {
        //     [getDate]: { [getId]: data },
        //   },
        // },
        todoToDelete: getId,
        selectedDate: {
          selectedDay: getDate,
          selectedMonth: getMonth,
          selectedYear: getYear,
        },
      },
    });
  } catch (err) {
    console.log('Error!!', err);
  }
};

export const addPriority = (data) => async (dispatch, getState) => {
  try {
    const userPriorities = getState().firebase.profile.userPriorities;
    const { uid } = getState().firebase.auth;
    const priorityExists = userPriorities.findIndex((el) => el === data);

    console.log('priorityExists', priorityExists, data);

    if (priorityExists === -1) {
      await db.doc(`users/${uid}`).update({
        userPriorities: firebase.firestore.FieldValue.arrayUnion(data),
      });
    } else {
      throw new Error('Priority already exists!');
    }

    dispatch({
      type: todoTypes.ADD_PRIORITY,
    });
  } catch (err) {
    console.log('Error!!', err);
  }
};
