import React, { useState } from 'react';
import './Pokemon.css';

const PokemonEvolution = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [evolutionChain, setEvolutionChain] = useState([]);

  const getEvolutionData = async () => {
    try {
      const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName.toLowerCase()}`);
      const speciesData = await speciesRes.json();

      const evoRes = await fetch(speciesData.evolution_chain.url);
      const evoData = await evoRes.json();

      const evoNames = [];
      let current = evoData.chain;

      while (current) {
        evoNames.push(current.species.name);
        current = current.evolves_to[0];
      }

      const evoWithImages = await Promise.all(
        evoNames.map(async (name) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
          const data = await res.json();
          return {
            name: name.charAt(0).toUpperCase() + name.slice(1),
            image: data.sprites.other['official-artwork'].front_default
          };
        })
      );

      setEvolutionChain(evoWithImages);
    } catch (err) {
      console.error('Error fetching evolution chain:', err);
      setEvolutionChain([]);
    }
  };

  return (
    <div className="container">
      <h1>Pokémon Evolution Finder</h1>
      <div className="input-container">
        <input
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          placeholder="Enter Pokémon name"
        />
        <button onClick={getEvolutionData}>Get Evolution</button>
      </div>
      <h2>Evolution Chain</h2>
      <div className="evolution-chain">
        {evolutionChain.map((evo, index) => (
          <React.Fragment key={evo.name}>
            <div className="evolution-card">
              <img src={evo.image} alt={evo.name} />
              <p>{evo.name}</p>
            </div>
            {index < evolutionChain.length - 1 && <span className="arrow">→</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PokemonEvolution;
