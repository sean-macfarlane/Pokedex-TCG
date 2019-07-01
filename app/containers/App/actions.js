import {
  LOAD_POKEMON_REQUEST,
  LOAD_POKEMON_SUCCESS,
  LOAD_POKEMON_FAILURE,
} from './constants';

export const loadPokemonRequest = (query, page) => ({
  type: LOAD_POKEMON_REQUEST,
  query,
  page,
});

export const loadPokemonSuccess = result => ({
  type: LOAD_POKEMON_SUCCESS,
  result,
});

export const loadPokemonFailure = error => ({
  type: LOAD_POKEMON_FAILURE,
  error,
});
