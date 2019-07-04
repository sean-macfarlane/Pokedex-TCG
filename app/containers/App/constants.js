/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_POKEMON_REQUEST = 'LOAD_POKEMON_REQUEST';
export const LOAD_POKEMON_SUCCESS = 'LOAD_POKEMON_SUCCESS';
export const LOAD_POKEMON_FAILURE = 'LOAD_POKEMON_FAILURE';

export const LOAD_TYPES_REQUEST = 'LOAD_TYPES_REQUEST';
export const LOAD_TYPES_SUCCESS = 'LOAD_TYPES_SUCCESS';
export const LOAD_TYPES_FAILURE = 'LOAD_TYPES_FAILURE';

export const LOAD_SETS_REQUEST = 'LOAD_SETS_REQUEST';
export const LOAD_SETS_SUCCESS = 'LOAD_SETS_SUCCESS';
export const LOAD_SETS_FAILURE = 'LOAD_SETS_FAILURE';
