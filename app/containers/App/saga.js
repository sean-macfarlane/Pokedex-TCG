import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { request } from 'utils/request';

import {
  loadPokemonSuccess,
  loadPokemonFailure,
  loadTypesSuccess,
  loadTypesFailure,
  loadSetsSuccess,
  loadSetsFailure,
} from './actions';
import {
  LOAD_POKEMON_REQUEST,
  LOAD_TYPES_REQUEST,
  LOAD_SETS_REQUEST,
} from './constants';

export default function* watchGlobalActions() {
  yield takeEvery(LOAD_POKEMON_REQUEST, loadPokemonSaga);
  yield takeEvery(LOAD_TYPES_REQUEST, loadTypesSaga);
  yield takeEvery(LOAD_SETS_REQUEST, loadSetsSaga);
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

/* Load Types saga start */

export function* loadTypesSaga() {
  try {
    const url = `https://api.pokemontcg.io/v1/types`;

    const response = yield call(request, url);

    const successResult = yield put(
      loadTypesSuccess(fromJS(response && response.data))
    );

    return successResult;
  } catch (error) {
    const failureResult = yield put(loadTypesFailure(`Failed to load types`));

    return failureResult;
  }
}

/* Load Sets saga start */

export function* loadSetsSaga() {
  try {
    const url = `https://api.pokemontcg.io/v1/sets`;

    const response = yield call(request, url);

    const successResult = yield put(
      loadSetsSuccess(fromJS(response && response.data))
    );

    return successResult;
  } catch (error) {
    const failureResult = yield put(loadSetsFailure(`Failed to load sets`));

    return failureResult;
  }
}
