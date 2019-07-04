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

export const loadTypesRequest = () => ({
  type: LOAD_TYPES_REQUEST,
});

export const loadTypesSuccess = result => ({
  type: LOAD_TYPES_SUCCESS,
  result,
});

export const loadTypesFailure = error => ({
  type: LOAD_TYPES_FAILURE,
  error,
});

export const loadSetsRequest = () => ({
  type: LOAD_SETS_REQUEST,
});

export const loadSetsSuccess = result => ({
  type: LOAD_SETS_SUCCESS,
  result,
});

export const loadSetsFailure = error => ({
  type: LOAD_SETS_FAILURE,
  error,
});
