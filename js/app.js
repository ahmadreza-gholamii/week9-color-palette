// base colors on card
const baseColors = [
  { id: "red", color: "#EF4444" },
  { id: "green", color: "#22C55E" },
  { id: "blue", color: "#3B82F6" },
];

// default palettes on header
const palettes = [
  {
    id: "ice",
    name: "Ice",
    colors: [
      { id: 1, hex: "#67E8F9" },
      { id: 2, hex: "#22D3EE" },
      { id: 3, hex: "#06B6D4" },
      { id: 4, hex: "#0891B2" },
    ],
  },
  {
    id: "warm",
    name: "Warm",
    colors: [
      { id: 1, hex: "#FDA4AF" },
      { id: 2, hex: "#FB7185" },
      { id: 3, hex: "#F43F5E" },
      { id: 4, hex: "#E11D48" },
    ],
  },
  {
    id: "nature",
    name: "Nature",
    colors: [
      { id: 1, hex: "#86EFAC" },
      { id: 2, hex: "#4ADE80" },
      { id: 3, hex: "#22C55E" },
      { id: 4, hex: "#16A34A" },
    ],
  },
  {
    id: "moon",
    name: "Moon",
    colors: [
      { id: 1, hex: "#E2E8F0" },
      { id: 2, hex: "#CBD5E1" },
      { id: 3, hex: "#94A3B8" },
      { id: 4, hex: "#475569" },
    ],
  },
];

// get element
const generate = document.getElementById("generate-button");
const moon = document.getElementById("moon");
const nature = document.getElementById("nature");
const warm = document.getElementById("warm");
const ice = document.getElementById("ice");
const main = document.querySelector(".main");
const cards = document.querySelectorAll(".main-card");
const defaultBlues = document.querySelectorAll(".card-default_blue");
const defaultGreens = document.querySelectorAll(".card-default_green");
const defaultReds = document.querySelectorAll(".card-default_red");
const favoriteHeart = document.querySelector(".card-favorite");
const favoriteSection = document.querySelector(".favorite-cards");
const searchInput = document.querySelector("#color-search");
const searchResult = document.querySelector("#search-result");
let favoriteColors = JSON.parse(localStorage.getItem("favoriteColors")) || [];

// random color
function createHexadecimalColor() {
  const char = "0123456789ABCDEF";
  let color = "#";
  for (let i = 1; i < 7; i++) {
    color += char[Math.floor(Math.random() * 16)];
  }
  return color;
}

// create random color
function createRandomColors() {
  return [
    { id: 1, hex: createHexadecimalColor() },
    { id: 2, hex: createHexadecimalColor() },
    { id: 3, hex: createHexadecimalColor() },
    { id: 4, hex: createHexadecimalColor() },
  ];
}
let colors = createRandomColors();

// apply color when site mount
function applyColors(colorsToApply) {
  colors = colorsToApply.map((color) => ({ ...color }));
  cards.forEach((card, index) => {
    card.style.backgroundColor = colors[index].hex;
    card.querySelector(".card-colorName").textContent = colors[index].hex;
    removeActiveStyle(card);
  });
  updateFavoriteButtons();
}
applyColors(colors);

// change each card after click
cards.forEach((card) => {
  card.addEventListener("click", () => {
    const index = Number(card.dataset.index);
    colors[index].hex = createHexadecimalColor();
    card.style.backgroundColor = colors[index].hex;
    card.querySelector(".card-colorName").textContent = colors[index].hex;

    removeActiveStyle(card);
    updateFavoriteButtons();
  });
});

// use toast for copy
cards.forEach((card) => {
  const colorName = card.querySelector(".card-colorName");
  colorName.addEventListener("click", async (event) => {
    event.stopPropagation();
    const hex = colorName.textContent;
    await navigator.clipboard.writeText(hex);
    showToast(`${hex} copied to clipboard`);
  });
});

// generate button
generate.addEventListener("click", () => {
  colors = createRandomColors();
  applyColors(colors);
});

document.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "r" || event.key.toLowerCase() === "ق") {
    generate.click();
  }
});

// default palettes creator
moon.addEventListener("click", (event) => {
  event.stopPropagation();
  applyColors(palettes[3].colors);
});
nature.addEventListener("click", (event) => {
  event.stopPropagation();
  applyColors(palettes[2].colors);
});
warm.addEventListener("click", (event) => {
  event.stopPropagation();
  applyColors(palettes[1].colors);
});
ice.addEventListener("click", (event) => {
  event.stopPropagation();
  applyColors(palettes[0].colors);
});

// blue button on card
defaultBlues.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const card = event.target.closest(".main-card");
    const index = Number(card.dataset.index);
    colors[index].hex = baseColors[2].color;
    card.style.backgroundColor = colors[index].hex;
    card.querySelector(".card-colorName").textContent = colors[index].hex;

    removeActiveStyle(card);
    button.classList.add("active");
    updateFavoriteButtons();
  });
});

// green button on card
defaultGreens.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const card = event.target.closest(".main-card");
    const index = Number(card.dataset.index);
    colors[index].hex = baseColors[1].color;
    card.style.backgroundColor = colors[index].hex;
    card.querySelector(".card-colorName").textContent = colors[index].hex;

    removeActiveStyle(card);
    button.classList.add("active");
    updateFavoriteButtons();
  });
});

// red button on card
defaultReds.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const card = event.target.closest(".main-card");
    const index = Number(card.dataset.index);
    colors[index].hex = baseColors[0].color;
    card.style.backgroundColor = colors[index].hex;
    card.querySelector(".card-colorName").textContent = colors[index].hex;

    removeActiveStyle(card);
    button.classList.add("active");
    updateFavoriteButtons();
  });
});

// remove border from active button
function removeActiveStyle(card) {
  const colorButtons = card.querySelectorAll(
    ".card-default_red, .card-default_green, .card-default_blue",
  );
  colorButtons.forEach((button) => {
    button.classList.remove("active");
  });
}

// toast notification
const toastContainer = document.querySelector("#toast-container");
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <span class="toast-icon">✓</span>
    <span class="toast-message">${message}</span>
  `;
  toastContainer.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.add("show");
  });
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 250);
  }, 2000);
}

// favorite
function isLightColor(hex) {
  const color = hex.replace("#", "");
  const red = parseInt(color.slice(0, 2), 16);
  const green = parseInt(color.slice(2, 4), 16);
  const blue = parseInt(color.slice(4, 6), 16);
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;

  return brightness > 150;
}

// update favorite buttons
function updateFavoriteButtons() {
  cards.forEach((card, index) => {
    const color = colors[index].hex.toUpperCase();
    const button = card.querySelector(".card-favorite");
    if (favoriteColors.includes(color)) {
      button.classList.add("is-favorite");
    } else {
      button.classList.remove("is-favorite");
    }
  });
  renderFavoriteColors();
  updateSearchFavoriteButton();
}

// for add # and search color
function normalizeHexColor(value) {
  const match = value.trim().match(/^#?([0-9a-f]{6})$/i);
  return match ? `#${match[1].toUpperCase()}` : null;
}

// for show in UI and add to favorite
function renderSearchColor() {
  const color = normalizeHexColor(searchInput.value);
  searchResult.innerHTML = "";
  searchResult.hidden = !color;

  if (!color) {
    return;
  }

  searchResult.className = `favorite-card search-result search-result-card ${isLightColor(color) ? "is-light" : "is-dark"}`;
  searchResult.style.backgroundColor = color;
  searchResult.dataset.color = color;
  searchResult.innerHTML = `
    <button class="card-favorite search-favorite" type="button" aria-label="Add ${color} to favorites" aria-pressed="false">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <p></p>
  `;
  searchResult.querySelector("p").textContent = color;
  searchResult
    .querySelector(".search-favorite")
    .addEventListener("click", () => {
      toggleFavoriteColor(color);
    });
  updateSearchFavoriteButton();
}

// update search favorite button
function updateSearchFavoriteButton() {
  const button = searchResult.querySelector(".search-favorite");
  if (!button) {
    return;
  }

  // check for favorite
  const isFavorite = favoriteColors.includes(searchResult.dataset.color);
  button.classList.toggle("is-favorite", isFavorite);
  button.setAttribute("aria-pressed", String(isFavorite));
  button.setAttribute(
    "aria-label",
    `${isFavorite ? "Remove" : "Add"} ${searchResult.dataset.color} ${isFavorite ? "from" : "to"} favorites`,
  );
}

searchInput.addEventListener("input", renderSearchColor);

// render favorite colors
function renderFavoriteColors() {
  favoriteSection.innerHTML = "";
  if (favoriteColors.length === 0) {
    favoriteSection.innerHTML =
      '<p class="favorite-empty">No favorite colors yet</p>';
    return;
  }
  favoriteColors.forEach((color) => {
    const favoriteCard = document.createElement("div");
    favoriteCard.className = `favorite-card ${isLightColor(color) ? "is-light" : "is-dark"}`;
    favoriteCard.style.backgroundColor = color;
    favoriteCard.innerHTML = `
      <button class="favorite-remove" type="button" aria-label="Remove ${color} from favorites" title="Remove favorite">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <p></p>
    `;
    favoriteCard.querySelector("p").textContent = color;
    const removeButton = favoriteCard.querySelector(".favorite-remove");
    removeButton.addEventListener("click", () => {
      toggleFavoriteColor(color);
    });
    favoriteSection.appendChild(favoriteCard);
  });
}

// toggle heart button and localStorage
function toggleFavoriteColor(color) {
  color = color.toUpperCase();
  if (favoriteColors.includes(color)) {
    const index = favoriteColors.indexOf(color);
    favoriteColors.splice(index, 1);
  } else {
    favoriteColors.push(color);
  }
  localStorage.setItem("favoriteColors", JSON.stringify(favoriteColors));
  updateFavoriteButtons();
}
document.querySelectorAll(".card-favorite").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const card = button.closest(".main-card");
    const index = Number(card.dataset.index);
    toggleFavoriteColor(colors[index].hex);
  });
});
