/* @flow */

import store from '../store';
import getAttackTypesForPokemon from './getAttackTypesForPokemon';
import getStrongAgainstTypes from './getStrongAgainstTypes';
import getWeakAgainstTypes from './getWeakAgainstTypes';
import compareStrength from './compareStrength';
import type {
  Pokemon,
} from '../typeDefinitions';

export default function getWeakAgainstPokemons(pokemon: Pokemon) {
  const strongAgainst = getStrongAgainstTypes(pokemon);
  const weakAgainst = getWeakAgainstTypes(pokemon);
  const weakAgainstPokemons = store.getPokemons()
  .filter(({ id }) => id !== pokemon.id)
  .map(p => ({ ...p, types: getAttackTypesForPokemon(p) }))
  .filter(({ types }) =>
    types.some(t => weakAgainst.includes(t)) && !types.some(t => strongAgainst.includes(t))
  )
  .sort((a, b) => compareStrength(b, a));

  return weakAgainstPokemons;
}
