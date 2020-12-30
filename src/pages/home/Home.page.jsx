import React from 'react';
import { connect } from 'react-redux';

import Header from '../../components/header/Header.component';
import VerifyEmail from '../../components/verifyEmail/VerifyEmail.component';
import TodoContainer from '../../containers/todo-container/Todo.container';
import { initialDataFetch } from '../../redux/app/app.action';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmailVerified: this.props.emailVerified,
    };
  }

  componentDidMount() {
    if (this.props.shouldFetchData) this.props.initialFetch();
  }

  render() {
    return (
      <>
        <Header />
        {this.state.isEmailVerified ? <TodoContainer /> : <VerifyEmail />}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  shouldFetchData: state.todos.shouldFetchData,
  emailVerified: state.firebase.auth.emailVerified,
});

const mapDispatchToProps = (dispatch) => ({
  initialFetch: () => dispatch(initialDataFetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
