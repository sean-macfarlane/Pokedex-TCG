/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import T from 'prop-types';

import HomePage from 'containers/HomePage/Loadable';
import PokemonPage from 'containers/PokemonPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import MasterLayout from 'containers/MasterLayout';

import reducer from './reducer';
import saga from './saga';

import GlobalStyle from '../../global-styles';

const RouteWithLayout = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <MasterLayout>
        <Component {...props} />
      </MasterLayout>
    )}
  />
);

RouteWithLayout.propTypes = {
  component: T.func,
};

function App() {
  return (
    <div>
      <Helmet titleTemplate="%s - Pokédex" defaultTitle="Pokédex">
        <meta name="description" content="Pokédex" />
      </Helmet>
      <Switch>
        <RouteWithLayout exact path="/" component={HomePage} />
        <RouteWithLayout exact path="/:id" component={PokemonPage} />
        <RouteWithLayout component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}

const withReducer = injectReducer({ key: 'global', reducer });
const withSaga = injectSaga({ key: 'global', saga });

export default compose(
  withReducer,
  withSaga
)(App);
