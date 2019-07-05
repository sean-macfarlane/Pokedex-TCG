/**
 * Asynchronously loads the component for PokemonPage
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
