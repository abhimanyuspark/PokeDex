document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("nav");
  const ul = document.createElement("ul");
  const search = document.createElement("form");
  search.className = "search";
  search.onsubmit = (e) => {
    e.preventDefault();
  };
  const searchInput = document.createElement("input");
  const searchButton = document.createElement("button");
  searchInput.type = "search";
  searchInput.className = "search-input";
  searchInput.placeholder = "Search...";

  const navData = [
    { title: "Pokemons", link: "../pages/index.html" },
    // { title: "About", link: "#" },
    // { title: "Contact", link: "#" },
  ];

  navData.forEach((item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = item.link;
    a.textContent = item.title;
    li.appendChild(a);
    ul.appendChild(li);
  });

  searchButton.textContent = "Search";
  searchButton.className = "search-button";
  searchButton.addEventListener("click", () => {
    const value = searchInput.value.trim();
    submit(value);
  });

  function submit(value) {
    if (searchInput.value === "") return;
    window.location.href = "../pages/details.html?name=" + value;
    searchInput.value = "";
  }

  search.appendChild(searchInput);
  search.appendChild(searchButton);

  nav.appendChild(ul);
  nav.appendChild(search);

  // Add event listener to window scroll event
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition >= 40) {
      nav.style.backgroundColor = "black";
    } else {
      nav.style.backgroundColor = ""; // reset to original color
    }
  });
});
