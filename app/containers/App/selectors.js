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

const makeSelectPokemonList = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('pokemonList')
  );

const makeSelectTypes = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('types')
  );

const makeSelectSets = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.get('sets')
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
  makeSelectPokemonList,
  makeSelectPokemon,
  makeSelectTypes,
  makeSelectSets,
};
