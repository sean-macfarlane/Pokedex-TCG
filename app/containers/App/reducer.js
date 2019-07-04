import { fromJS } from 'immutable';

import {
  LOAD_POKEMON_REQUEST,
  LOAD_POKEMON_SUCCESS,
  LOAD_POKEMON_FAILURE,
  LOAD_TYPES_REQUEST,
  LOAD_TYPES_SUCCESS,
  LOAD_TYPES_FAILURE,
  LOAD_SETS_REQUEST,
  LOAD_SETS_SUCCESS,
  LOAD_SETS_FAILURE,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  error: false,
  loading: false,
  pokemon: {
    loading: false,
    data: false,
  },
  types: {
    loading: false,
    data: false,
  },
  sets: {
    loading: false,
    data: false,
  },
});

function appReducer(currentState = initialState, action) {
  const state = currentState.setIn(['error'], false);

  switch (action.type) {
    case LOAD_POKEMON_REQUEST:
      return state.setIn(['pokemon', 'loading'], true);

    case LOAD_POKEMON_SUCCESS:
      return state
        .setIn(['pokemon', 'loading'], false)
        .updateIn(
          ['pokemon', 'data'],
          currentValue =>
            (action.result && action.result.get('cards')) || currentValue
        );

    case LOAD_POKEMON_FAILURE:
      return state
        .setIn(['pokemon', 'loading'], false)
        .set('error', action.error);

    case LOAD_TYPES_REQUEST:
      return state.setIn(['types', 'loading'], true);

    case LOAD_TYPES_SUCCESS:
      return state
        .setIn(['types', 'loading'], false)
        .updateIn(
          ['types', 'data'],
          currentValue =>
            (action.result && action.result.get('types')) || currentValue
        );

    case LOAD_TYPES_FAILURE:
      return state
        .setIn(['types', 'loading'], false)
        .set('error', action.error);

    case LOAD_SETS_REQUEST:
      return state.setIn(['sets', 'loading'], true);

    case LOAD_SETS_SUCCESS:
      return state
        .setIn(['sets', 'loading'], false)
        .updateIn(
          ['sets', 'data'],
          currentValue =>
            (action.result && action.result.get('sets')) || currentValue
        );

    case LOAD_SETS_FAILURE:
      return state.setIn(['sets', 'loading'], false).set('error', action.error);

    default:
      return state;
  }
}

export default appReducer;
