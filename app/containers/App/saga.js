import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { request } from 'utils/request';

import { loadPokemonSuccess, loadPokemonFailure } from './actions';
import { LOAD_POKEMON_REQUEST } from './constants';

export default function* watchGlobalActions() {
  yield takeEvery(LOAD_POKEMON_REQUEST, loadPokemonSaga);
}

/* Load Pokemon saga start */

export function* loadPokemonSaga(action) {
  try {
    const url = `https://api.pokemontcg.io/v1/cards?${
      action.query
    }&page=${action.page || 1}`;

    const response = yield call(request, url);

    const successResult = yield put(
      loadPokemonSuccess(fromJS(response && response.data))
    );

    return successResult;
  } catch (error) {
    const failureResult = yield put(
      loadPokemonFailure(`Failed to load Pokemon`)
    );

    return failureResult;
  }
}
