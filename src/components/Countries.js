import axios from "axios";
import React, { useEffect, useState } from "react";
import Cards from "./Cards";

const Countries = () => {
  // Section de déclaration des Hooks (State et Effect)

  // Deux états du component (data avec un tableau vide par défaut et rangeValue avec 12 par défaut)
  const [data, setData] = useState([]);
  const [rangeValue, setRangeValue] = useState(36);
  const [selectedRadio, setSelectedRadio] = useState("");
  const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];

  // Effet de bord du composant devant s'executer après chaque affichage si data à changé
  // Le fait de placer data entre cochet à la fin de la fonction, indique au Hook de ne s'éxécuter que
  // si la valeur de data à changé
  useEffect(() => {
    axios
      // Appel du webservice puis utiliser le résultat et envoyer la partie .data à setData
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setData(res.data));
  }, [data]);

  return (
    <div className="countries">
      <ul className="radio-container">
        <input
          type="range"
          min="1"
          max="250"
          defaultValue={rangeValue}
          // Décomposition de la fonction flèchée
          // Passer la variable d'événement 'e' à une fonction qui n'a pas de nom
          // Utiliser setRangeValue pour modifier le Stat RangeValue avec .target.value de e
          onChange={(e) => setRangeValue(e.target.value)}
        />
        {radios.map((continent) => (
          <li>
            <input
              type="radio"
              name="continentRadio"
              checked={continent === selectedRadio}
              id={continent}
              onChange={(e) => setSelectedRadio(e.target.id)}
            />
            <label htmlFor={continent}>{continent}</label>
          </li>
        ))}
      </ul>
      {selectedRadio && (
        <button onClick={() => setSelectedRadio("")}>
          Annuler la recherche
        </button>
      )}
      <ul>
        {data
          .filter((country) => country.continents[0].includes(selectedRadio))
          .sort((a, b) => b.population - a.population)
          .slice(0, rangeValue)
          .map((country, index) => (
            // Appeler la component 'Card' en lui passant une key et une props
            <Cards key={index} country={country} />
          ))}
      </ul>
    </div>
  );
};

export default Countries;
