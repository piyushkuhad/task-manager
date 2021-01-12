import React from 'react';
import { Link, Redirect, Switch } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';

import Header from '../../components/header/Header.component';
import PrivateRoute from '../../components/private-route/PrivateRoute.component';
import UserInfo from '../../components/my-account-menu/UserInfo.component';
import './MyAccount.styles.scss';
import Settings from '../../components/my-account-menu/Settings.component';

const MyAccount = (props) => {
  //const { url, path } = useRouteMatch();
  const {
    computedMatch: { url, path },
    location: { pathname },
  } = props;

  return (
    <>
      <Header />
      <div className="cm-my-account-container cm-flex-type-2">
        <div className="cm-page-center cm-flex cm-flex-sb">
          <div className="cm-account-sidebar-wrapper">
            <ul className="cm-menu-ul">
              <li>
                <Link
                  to={`${url}/user-info`}
                  className={pathname === path + '/user-info' ? 'active' : ''}
                >
                  <PersonIcon size="small" /> User Info
                </Link>
              </li>
              <li>
                <Link
                  to={`${url}/settings`}
                  className={pathname === path + '/settings' ? 'active' : ''}
                >
                  <SettingsIcon size="small" /> Settings
                </Link>
              </li>
            </ul>
          </div>
          <div className="cm-account-main-wrapper">
            <Switch>
              <PrivateRoute
                exact
                path={`${path}/user-info`}
                component={UserInfo}
              />
              <PrivateRoute
                exact
                path={`${path}/settings`}
                component={Settings}
              />
            </Switch>
            <Redirect from="/my-account" to="/my-account/user-info" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
