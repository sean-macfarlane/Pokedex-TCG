import { createSelector } from 'reselect';

const selectRoute = state => state.get('router');

const selectGlobal = state => state.get('global');

const makeSelectLocation = () =>
  createSelector(
    selectRoute,
    routeState => routeState.get('location').toJS()
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('loading')
  );

const makeSelectPokemon = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('pokemon')
  );

export {
  selectRoute,
  selectGlobal,
  makeSelectLocation,
  makeSelectLoading,
  makeSelectPokemon,
};
