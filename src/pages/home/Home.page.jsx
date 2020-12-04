import React from 'react';
import { useSelector } from 'react-redux';

import Header from '../../components/header/Header.component';
import TodoContainer from '../../containers/todo-container/Todo.container';

const HomePage = (props) => {
  const { displayName } = useSelector((state) => state.firebase.auth);

  return (
    <>
      <Header />
      <TodoContainer />
    </>
  );
};

export default HomePage;
