const pokeInput = document.querySelector(".search");
const pokeBtn = document.querySelector(".search-btn");

const pokemonName = document.querySelector(".pokemon-name");
const pokemonNumber = document.querySelector(".pokemon-number");
const imgContainer = document.querySelector(".img");

const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".previous");

const leftAnimation = (target) => {
  anime({
    targets: target,
    opacity: [0, 1],
    translateX: [-20, 0],
    duration: 1000,
    easing: "easeOutElastic(1, .6)",
  });
};

const rigthAnimation = (target) => {
  anime({
    targets: target,
    opacity: [0, 1],
    translateX: [20, 0],
    duration: 1000,
    easing: "easeOutElastic(1, .6)",
  });
};

const upAnimation = (target) => {
  anime({
    targets: target,
    opacity: [0, 1],
    translateY: [-20, 0],
    duration: 1000,
    easing: "easeOutElastic(1, .6)",
  });
};

const statsAnimation = (target) => {
  anime({
    targets: target,
    opacity: [0, 1],
    translateY: [-10, 0],
    direction: "normal",
    delay: function (el, i, l) {
      return i * 100;
    },
    easing: "easeOutElastic(1, .3)",
  });
};

let i = 1;
function fetchPokemons() {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokeInput.value.toLowerCase()}`)
    .then((pokemon) => {
      return pokemon.json();
    })
    .then((data) => {
      showPokemonInfo(data);
      setColors(data.types);
      i = data.id;
    });
}

nextBtn.addEventListener("click", nextPokemon);
previousBtn.addEventListener("click", previousPokemon);

function nextPokemon() {
  if (i < 898) {
    i++;
  }
  fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      showPokemonInfo(res);
      setColors(res.types);
    });
}
function previousPokemon() {
  if (i > 1) {
    i--;
  }
  fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      showPokemonInfo(res);
      setColors(res.types);
    });
}

function setColors(types) {
  const pokemonInfoContainer = document.querySelector(".pokemon-info");
  const statsContainer = document.querySelector(".stats");
  const subs = document.querySelectorAll(".sub");
  const typesEl = document.querySelectorAll(".type");

  let darkColor;
  let lightColor;
  let lighterColor;
  if (types[0].type.name === "grass") {
    darkColor = "#176e00";
    lightColor = "#80ac31";
    lighterColor = "#aede3e";
  } else if (types[0].type.name === "fire") {
    darkColor = "#BE1013";
    lightColor = "#E45323";
    lighterColor = "#F6960E";
  } else if (types[0].type.name === "water") {
    darkColor = "#161F6F";
    lightColor = "#3669D5";
    lighterColor = "#1AA9D0";
  } else if (types[0].type.name === "bug") {
    darkColor = "#63AE3C";
    lightColor = "#72C345";
    lighterColor = "#F2CC8F";
  } else if (types[0].type.name === "normal") {
    darkColor = "#656A6F";
    lightColor = "#9EA3A5";
    lighterColor = "#CBCECF";
  } else if (types[0].type.name === "poison") {
    darkColor = "#735189";
    lightColor = "#957BB6";
    lighterColor = "#B789AA";
  } else if (types[0].type.name === "electric") {
    darkColor = "#FFBA01";
    lightColor = "#FFD82F";
    lighterColor = "#FEF65C";
  } else if (types[0].type.name === "ground") {
    darkColor = "#9E5D43";
    lightColor = "#AB7C4A";
    lighterColor = "#CFAF7B";
  } else if (types[0].type.name === "fairy") {
    darkColor = "#FB8AC5";
    lightColor = "#FECEE6";
    lighterColor = "#FEF3CF";
  } else if (types[0].type.name === "fighting") {
    darkColor = "#3F2C22";
    lightColor = "#444444";
    lighterColor = "#F3DB04";
  } else if (types[0].type.name === "psychic") {
    darkColor = "#6300BD";
    lightColor = "#A120F2";
    lighterColor = "#FF4FDB";
  } else if (types[0].type.name === "rock") {
    darkColor = "#5A5349";
    lightColor = "#85653C";
    lighterColor = "#9A9D96";
  } else if (types[0].type.name === "ghost") {
    darkColor = "#200A24";
    lightColor = "#321A37";
    lighterColor = "#4E2C5D";
  } else if (types[0].type.name === "ice") {
    darkColor = "#41809C";
    lightColor = "#C3CDD7";
    lighterColor = "#F8FCFF";
  } else if (types[0].type.name === "dragon") {
    darkColor = "#530092";
    lightColor = "#FF5607";
    lighterColor = "#FF9306";
  } else if (types[0].type.name === "flying") {
    darkColor = "#1CC2E3";
    lightColor = "#76E2EB";
    lighterColor = "#F5F5F5";
  } else if (types[0].type.name === "dark") {
    darkColor = "#0C0E0C";
    lightColor = "#191919";
    lighterColor = "#2D2D2D";
  } else if (types[0].type.name === "steel") {
    darkColor = "#004C55";
    lightColor = "#A5ACAF";
    lighterColor = "#FFFFFF";
  }

  // dark color
  imgContainer.style.backgroundColor = darkColor;
  pokemonName.style.color = darkColor;
  pokemonNumber.style.color = darkColor;
  subs.forEach((sub) => {
    const afterStyle = sub.appendChild(document.createElement("style"));
    afterStyle.innerHTML = `
      .sub::after {
        background-color: ${darkColor}
      }
    `;
  });
  // light color
  pokemonInfoContainer.style.backgroundColor = lightColor;
  statsContainer.appendChild(document.createElement("style")).innerHTML = `
  .stats li + li::before {
    background-color: ${lightColor}
  }
  `;
  // lighter color
  subs.forEach((sub) => (sub.style.color = lighterColor));
  statsContainer.style.backgroundColor = lighterColor;
  // typesEl.forEach((type) => {
  //   type.style.backgroundColor = lighterColor;
  // });
  for (let i = 0; i < typesEl.length; i++) {
    if (typesEl[i].innerText === "grass") {
      lighterColor = "#aede3e";
      typesEl[i].style.backgroundColor = lighterColor;
    } else if (typesEl[i].innerText === "fire") {
      lighterColor = "#F6960E";
      typesEl[i].style.backgroundColor = lighterColor;
    } else if (typesEl[i].innerText === "water") {
      lighterColor = "#1AA9D0";
      typesEl[i].style.backgroundColor = lighterColor;
    } else if (typesEl[i].innerText === "bug") {
      lighterColor = "#F2CC8F";
      typesEl[i].style.backgroundColor = lighterColor;
    } else if (typesEl[i].innerText === "normal") {
      lighterColor = "#CBCECF";
      typesEl[i].style.backgroundColor = lighterColor;
    } else if (typesEl[i].innerText === "poison") {
      lighterColor = "#B789AA";
      typesEl[i].style.backgroundColor = lighterColor;
    } else if (typesEl[i].innerText === "electric") {
      lighterColor = "#FEF65C";
      typesEl[i].style.backgroundColor = lighterColor;
    } else if (typesEl[i].innerText === "ground") {
      lighterColor = "#CFAF7B";
      typesEl[i].style.backgroundColor = lighterColor;
    } else if (typesEl[i].innerText === "fairy") {
      lighterColor = "#FEF3CF";
      typesEl[i].style.backgroundColor = lighterColor;
    } else if (typesEl[i].innerText === "fighting") {
      lighterColor = "#F3DB04";
      typesEl[i].style.backgroundColor = lighterColor;
    } else if (typesEl[i].innerText === "psychic") {
      lighterColor = "#FF4FDB";
      typesEl[i].style.backgroundColor = lighterColor;
    } else if (typesEl[i].innerText === "rock") {
      lighterColor = "#9A9D96";
      typesEl[i].style.backgroundColor = lighterColor;
    } else if (typesEl[i].innerText === "ghost") {
      lighterColor = "#4E2C5D";
      typesEl[i].style.backgroundColor = lighterColor;
    } else if (typesEl[i].innerText === "ice") {
      lighterColor = "#F8FCFF";
      typesEl[i].style.backgroundColor = lighterColor;
    } else if (typesEl[i].innerText === "dragon") {
      lighterColor = "#FF9306";
      typesEl[i].style.backgroundColor = lighterColor;
    } else if (typesEl[i].innerText === "flying") {
      lighterColor = "#F5F5F5";
      typesEl[i].style.backgroundColor = lighterColor;
    } else if (typesEl[i].innerText === "dark") {
      lighterColor = "#2D2D2D";
      typesEl[i].style.backgroundColor = lighterColor;
    } else if (typesEl[i].innerText === "steel") {
      lighterColor = "#FFFFFF";
      typesEl[i].style.backgroundColor = lighterColor;
    }
  }
}

function showPokemonInfo(data) {
  // pokemon name
  showPokemonName(data.name);
  // pokemon number
  showPokemonNumber(data.id);
  // pokemon entrie
  showPokemonEntrie(data.id);
  // pokemon stats
  showPokemonStats(data.stats);
  // pokemon type
  showPokemonType(data.types);
  // pokemon img
  showPokemonImg(data);
}

function showPokemonName(data) {
  pokemonName.innerText = data.charAt(0).toUpperCase() + data.slice(1);
  leftAnimation(pokemonName);
}

function showPokemonNumber(data) {
  if (data < 10) {
    pokemonNumber.innerText = `#00${data}`;
  } else if (data < 100) {
    pokemonNumber.innerText = `#0${data}`;
  } else {
    pokemonNumber.innerText = `#${data}`;
  }
  upAnimation(pokemonNumber);
}

function showPokemonEntrie(id) {
  const pokemonEntrie = document.querySelector(".entrie");
  fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
    .then((data) => {
      return data.json();
    })
    .then((res) => {
      return res.flavor_text_entries.filter(
        (entrie) => entrie.language.name == "en"
      );
    })
    .then((entrie) => {
      pokemonEntrie.innerText = entrie[0].flavor_text
        .replace("\n", " ")
        .replace("\f", " ");
      rigthAnimation(pokemonEntrie);
    });
}

function showPokemonStats(statsArray) {
  const hp = document.querySelector(".hp");
  const attack = document.querySelector(".attack");
  const defense = document.querySelector(".defense");
  const spAttack = document.querySelector(".sp-attack");
  const spDefense = document.querySelector(".sp-defense");
  const speed = document.querySelector(".speed");
  const statsHP = statsArray.filter((stats) => stats.stat.name == "hp")[0]
    .base_stat;
  const statsAttack = statsArray.filter(
    (stats) => stats.stat.name == "attack"
  )[0].base_stat;
  const statsDefense = statsArray.filter(
    (stats) => stats.stat.name == "defense"
  )[0].base_stat;
  const statsSpAttack = statsArray.filter(
    (stats) => stats.stat.name == "special-attack"
  )[0].base_stat;
  const statsSpDefense = statsArray.filter(
    (stats) => stats.stat.name == "special-defense"
  )[0].base_stat;
  const statsSpeed = statsArray.filter((stats) => stats.stat.name == "speed")[0]
    .base_stat;

  hp.innerText = statsHP;
  attack.innerText = statsAttack;
  defense.innerText = statsDefense;
  spAttack.innerText = statsSpAttack;
  spDefense.innerText = statsSpDefense;
  speed.innerText = statsSpeed;
  statsAnimation(".stats li");
}

function showPokemonType(data) {
  const pokemonTypeContainer = document.querySelector(".types");
  pokemonTypeContainer.innerHTML = "";
  data.forEach((type) => {
    pokemonTypeContainer.innerHTML += `<div class="type">${type.type.name}</div>`;
  });
  leftAnimation(pokemonTypeContainer);
}

function showPokemonImg() {
  imgContainer.innerHTML = `<img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonNumber.innerText.slice(
    1
  )}.png"></img>`;
  const img = imgContainer.querySelector("img");
  upAnimation(img);
}

pokeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fetchPokemons();
});
