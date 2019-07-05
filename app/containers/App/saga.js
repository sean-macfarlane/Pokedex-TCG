import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { request } from 'utils/request';

import {
  loadPokemonSuccess,
  loadPokemonFailure,
  loadPokemonListSuccess,
  loadPokemonListFailure,
  loadTypesSuccess,
  loadTypesFailure,
  loadSetsSuccess,
  loadSetsFailure,
} from './actions';
import {
  LOAD_POKEMON_REQUEST,
  LOAD_POKEMON_LIST_REQUEST,
  LOAD_TYPES_REQUEST,
  LOAD_SETS_REQUEST,
} from './constants';

export default function* watchGlobalActions() {
  yield takeEvery(LOAD_POKEMON_REQUEST, loadPokemonSaga);
  yield takeEvery(LOAD_POKEMON_LIST_REQUEST, loadPokemonListSaga);
  yield takeEvery(LOAD_TYPES_REQUEST, loadTypesSaga);
  yield takeEvery(LOAD_SETS_REQUEST, loadSetsSaga);
}

/* Load Pokemon saga start */

export function* loadPokemonSaga(action) {
  try {
    const url = `https://api.pokemontcg.io/v1/cards/${action.id}`;

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

/* Load Pokemon List saga start */

export function* loadPokemonListSaga(action) {
  try {
    const { name, types, sets, typesOperator } = action.params;
    let query = '';

    if (name) {
      query += `name=${name}`;
    }

    if (types && types.length > 0) {
      query += `&types=`;
      types.forEach(t => {
        query += `${t}${typesOperator}`;
      });
    }

    if (sets && sets.length > 0) {
      query += `&setCode=`;
      sets.forEach(s => {
        query += `${s}|`;
      });
    }

    const url = `https://api.pokemontcg.io/v1/cards?${query}&page=${action.page ||
      1}`;

    const response = yield call(request, url);

    const successResult = yield put(
      loadPokemonListSuccess(
        fromJS(response && response.data),
        response && response.headers
      )
    );

    return successResult;
  } catch (error) {
    const failureResult = yield put(
      loadPokemonListFailure(`Failed to load Pokemon List`)
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
