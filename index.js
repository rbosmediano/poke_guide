let pokemonNameRef = document.getElementById("pokemon-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

// function to fecth data from api
let getPokemon = () => {
    let pokemonName = pokemonNameRef.value;
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
    //console.log("El nombre del pokemon es: " + pokemonName);
    let pokemonTypes = "";
    if (pokemonName.length <= 0 || pokemonName == "0" || parseInt(pokemonName) > 1010) {
        result.innerHTML = `<h3 class="msg">Please enter a Pokemon name or Pokedex number</h3>`
    }
    else {
    fetch(url)
    .then(res => res.json())
    .then(data => {
            if (data.id > 0){
                let name = JSON.stringify(data.name);
                name = name.replace("\"", "").replace("\"", " ");
                for (let i = 0; i < data.types.length + 2; i++) {
                    if (i < data.types.length) {
                        //console.log(i);
                        pokemonTypes += JSON.stringify(data.types[i].type.name);
                }
                    //console.log(pokemonTypes)
                    pokemonTypes = pokemonTypes.replace("\"", " ");
                }
                pokemonTypes = pokemonTypes.split(" ").join(" ");
                //console.log(pokemonTypes);
                result.innerHTML = `<div v class="info">
                                        <img src=${JSON.stringify(data.sprites.other['official-artwork'].front_default)} class="artwork">
                                        <div>
                                            <h2>${name.toUpperCase()}</h2>
                                            <div class="pokedex">
                                            <h4>Pokedex nº ${JSON.stringify(data.id)}</h4>
                                            </div>
                                            <div class="types">
                                                <div>${pokemonTypes.split("  ").join("</div><div>")}</div>
                                            </div>
                                            <br>
                                            <div class="types">                                                
                                                <div>Weight: ${JSON.stringify(data.weight)}</div>
                                            </div>
                                        </div>
                                    </div>

                                    `;
            }
            else {
                result.innerHTML = `<h3 class="msg">No Pokemon found</h3>`
            }
        })
    }
}

searchBtn.addEventListener("click", getPokemon);
window.addEventListener("load", getPokemon);