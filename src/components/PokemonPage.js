import React, { useState, useEffect } from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import Search from "./Search";
import { Container } from "semantic-ui-react";

function PokemonPage() {

  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/pokemon')
      .then((response) => response.json())
      .then((data) => setPokemon(data))
  }, [])

  const pokemonSearch = pokemon.filter((poke) => 
    poke.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleSubmitForm(newPokemon) {
    setPokemon([...pokemon, newPokemon]);
  }

  return (
    <Container>
      <h1>Pokemon Searcher</h1>
      <br />
      <PokemonForm handleSubmitForm={handleSubmitForm}/>
      <br />
      <Search setSearch={setSearch}/>
      <br />
      <PokemonCollection pokemon={pokemonSearch}/>
    </Container>
  );
}

export default PokemonPage;
