"use client";

import { useEffect, useState } from "react";

export default function ExplorarPage() {
  const [pokemones, setPokemones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=12")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No fue posible obtener los datos");
        }

        return respuesta.json();
      })
      .then((datos) => {
        setPokemones(datos.results);
      })
      .catch((error) => {
        console.error(error);
        setError("Ocurrió un problema al cargar los Pokémon.");
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return (
      <main className="explorar">
        <p>Cargando Pokémon...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="explorar">
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="explorar">
      <h1 className="explorar__titulo">Explorar Pokémon</h1>

      <div className="explorar__grilla">
        {pokemones.map((pokemon, indice) => (
          <article className="pokemon" key={pokemon.name}>
            <img
              className="pokemon__imagen"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${indice + 1}.png`}
              alt={`Ilustración de ${pokemon.name}`}
            />

            <h2 className="pokemon__nombre">{pokemon.name}</h2>
          </article>
        ))}
      </div>
    </main>
  );
}