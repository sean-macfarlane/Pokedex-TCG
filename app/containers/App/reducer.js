import { fromJS } from 'immutable';

import {
  LOAD_POKEMON_REQUEST,
  LOAD_POKEMON_SUCCESS,
  LOAD_POKEMON_FAILURE,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  error: false,
  loading: false,
  pokemon: {
    loading: false,
    cards: false,
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
          ['pokemon', 'cards'],
          currentValue =>
            (action.result && action.result.get('cards')) || currentValue
        );

    case LOAD_POKEMON_FAILURE:
      return state
        .setIn(['pokemon', 'loading'], false)
        .set('error', action.error);

    default:
      return state;
  }
}

export default appReducer;
