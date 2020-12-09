import React from 'react';
import { connect } from 'react-redux';

import Header from '../../components/header/Header.component';
import TodoContainer from '../../containers/todo-container/Todo.container';
import { initialDataFetch } from '../../redux/app/app.action';

class HomePage extends React.Component {
  //const { uid } = useSelector((state) => state.firebase.auth);
  // React.useEffect(() => {
  //   // db.collection('test-col')
  //   //   .get()
  //   //   .then((querySnapShot) => {
  //   //     querySnapShot.forEach((el) => console.log(`${el.id} => ${el.data()}`));
  //   //   });
  // db.doc(`users/${uid}`)
  //   .get()
  //   .then((querySnapshot) => {
  //     console.log('querySnapshot', querySnapshot.data());
  //     //querySnapshot.forEach((el) => console.log(el.data()));
  //   });
  // }, [uid]);

  componentDidMount() {
    if (this.props.shouldFetchData) this.props.initialFetch();
  }

  render() {
    return (
      <>
        <Header />
        <TodoContainer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  shouldFetchData: state.todos.shouldFetchData,
});

const mapDispatchToProps = (dispatch) => ({
  initialFetch: () => dispatch(initialDataFetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
