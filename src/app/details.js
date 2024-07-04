import data from "../data/db.js";

document.addEventListener("DOMContentLoaded", () => {
  const loadingElement = document.getElementById("loading");
  const pokemonContainer = document.getElementById("pokemon-container");
  const notFoundElement = document.getElementById("not-found");

  const url = "https://pokeapi.co/api/v2/pokemon";

  function getPokemon(pokeId) {
    loadingElement.style.display = "block";
    pokemonContainer.style.display = "none";
    notFoundElement.style.display = "none";

    fetch(`${url}/${pokeId}`)
      .then((response) => response.json())
      .then((pokemon) => {
        loadingElement.style.display = "none";
        if (!pokemon) {
          notFoundElement.style.display = "block";
        } else {
          pokemonContainer.style.display = "block";
          document.title = `${pokemon.name}`;
          pokemonContainer.innerHTML = "";
          showDetails(pokemon);
        }
      })
      .catch((error) => {
        console.error("Error fetching pokemon details:", error);
        loadingElement.style.display = "none";
        notFoundElement.style.display = "block";
      });
  }

  const showDetails = (pokemon) => {
    console.log(pokemon);

    const dataOBJ = {
      name: pokemon.name,
      order: pokemon.order,
      image:
        pokemon.sprites.other.dream_world.front_default ||
        "../assets/Poké_Ball_icon.svg.png",
      types: pokemon.types.length > 0 ? pokemon.types : "No data found",
      moves: pokemon.moves,
      cries: pokemon.cries.legacy,
      weight: pokemon.weight,
      height: pokemon.height,
      abilities: pokemon.abilities,
    };

    pokemonContainer.innerHTML = `
    <div class="details">

        <div class="details-image">
          <img loading="lazy" alt="pokemon ${dataOBJ.name}" src="${
      dataOBJ.image
    }" />
        </div>

      <div class="details-content">
        <div class="details-first">
            <div>
              <img loading="lazy" alt="pokemon ${
                dataOBJ.name
              }" src="../assets/Poké_Ball_icon.svg.png"  />
              <p>
                ${dataOBJ.order}
              </p>
            </div>

            <h1>${dataOBJ.name}</h1>
        </div>
          
        <div class="details-secound">
            <div class="secound w-h">
              <div>
                <h3>Weight</h3>
                <!-- hectograms -->
                <p>${dataOBJ.weight / 10} kg</p>
              </div>

              <div>
                <!-- decimetres -->
                <h3>Height</h3>
                <p>${dataOBJ.height * 10} cm</p>
              </div>
            </div>

            <div class="secound" id="types"></div>

            <div class="secound" id="abilities"></div>

            <div class="secound cry">
              <h3>Cry</h3>
              <audio controls src="${dataOBJ.cries}" ></audio>
            </div>
        </div>

      </div>
        <!-- <div>
          <h3>Moves</h3>
          <div>
            <input id="search-moves" placeholder="Search moves..." type="search" class="search-input" />
            <p id="moves-length"></p>
          </div>
          <div id="moves" ></div>
          <div id="no" class="not-found" >No data</div>
        </div>
        -->

    </div>
    `;

    const abilities = document.getElementById("abilities");
    dataOBJ.abilities.map((ability) => {
      const name = document.createElement("a");
      name.href = ability.ability.url;
      name.textContent = ability.ability.name;
      abilities.appendChild(name);
    });

    const types = document.getElementById("types");
    dataOBJ.types.map((poke) => {
      const name = document.createElement("a");
      name.href = poke.type.url;
      name.style.background = data.types[poke.type.name];
      name.textContent = poke.type.name;
      types.appendChild(name);
    });

    // const searchMoves = document.getElementById("search-moves");
    // const movesLength = document.getElementById("moves-length");
    // const moves = document.getElementById("moves");
    // const noData = document.getElementById("no");

    // searchMoves.addEventListener("input", (e) => {
    //   const value = e.target.value.toLowerCase();
    //   const filteredData = dataOBJ.moves.filter((item) =>
    //     item.move.name.toLowerCase().includes(value)
    //   );
    //   displayMoves(filteredData);
    //   movesLength.textContent = "Moves: " + filteredData.length;
    // });

    // const displayMoves = (data) => {
    //   moves.innerHTML = "";
    //   if (data.length === 0) {
    //     noData.style.display = "block";
    //     moves.style.display = "none";
    //   } else {
    //     noData.style.display = "none";
    //     moves.style.display = "grid";
    //     data.forEach((move) => {
    //       const moveElement = document.createElement("a");
    //       moveElement.textContent = move.move.name;
    //       moveElement.href = move.move.url;
    //       moves.appendChild(moveElement);
    //     });
    //   }
    // };

    // // Call displayMoves initially with all moves
    // displayMoves(dataOBJ.moves);
    // movesLength.textContent = "Moves: " + dataOBJ.moves.length;
  };

  // Get the product id from the URL query string
  const urlParams = new URLSearchParams(window.location.search);
  const pokeId = urlParams.get("name");
  if (pokeId) {
    getPokemon(pokeId);
  } else {
    loadingElement.style.display = "none";
    notFoundElement.style.display = "block";
  }
});
