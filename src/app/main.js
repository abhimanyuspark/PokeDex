document.addEventListener("DOMContentLoaded", () => {
  const loadingElement = document.getElementById("loading");
  const container = document.getElementById("data-container");
  const pokemonList = document.getElementById("pokemon-list");
  const notFoundElement = document.getElementById("not-found");
  const filterPokemon = document.getElementById("filter-pokemon");
  container.style.padding = "20px";

  const url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

  const fetchData = () => {
    loadingElement.style.display = "grid";
    container.style.display = "none";
    notFoundElement.style.display = "none";

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        const data = response.results;
        loadingElement.style.display = "none";

        if (data.length === 0) {
          notFoundElement.style.display = "block";
        } else {
          container.style.display = "block";
          displayPokemonList(data);
          filterPokemon.focus();
          filterPokemon.value = "";
          filterPokemon.addEventListener("input", (e) => {
            const value = e.target.value.toLowerCase();
            const filteredData = data.filter((item) =>
              item.name.toLowerCase().includes(value)
            );
            displayPokemonList(filteredData);
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        loadingElement.style.display = "none";
        notFoundElement.style.display = "block";
      });
  };

  const displayPokemonList = (data) => {
    pokemonList.innerHTML = "";
    if (data.length === 0) {
      pokemonList.style.gridTemplateColumns = "1fr";
      const dataItem = document.createElement("a");
      dataItem.className = "data-item";
      dataItem.style.textAlign = "center";
      dataItem.textContent = "No pokemon data found";
      pokemonList.appendChild(dataItem);
    } else {
      data.forEach((item) => {
        pokemonList.style.gridTemplateColumns = "repeat(6, 1fr)";
        const dataItem = document.createElement("a");
        dataItem.className = "data-item";
        dataItem.href = `../pages/details.html?name=${item.name}`;
        dataItem.textContent = item.name;
        pokemonList.appendChild(dataItem);
      });
    }
  };

  fetchData();
});
