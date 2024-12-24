const resultsData = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  content: `Content ${i}`,
}));

// Pagination Variables
const resultsPerPage = 5;
let currentPage = 1;
let currentSearchTerm = "";

const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("resultsContainer");
const pagination = document.getElementById("paginationContainer");
const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");
const currentPageSpan = document.getElementById("currentPage");

const renderResults = (resultsData) => {
  const resultsDataCopy = [...resultsData];
  const totalPages = Math.ceil(resultsDataCopy.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const resultsToShow = resultsDataCopy.slice(startIndex, endIndex);

  resultsContainer.innerHTML = resultsToShow
    .map((result) => {
      const highLightedContent = result.content.replaceAll(
        currentSearchTerm,
        `<span class="highlight">${currentSearchTerm}</span>`
      );
      return `<div class="result-item">${highLightedContent}</div>`;
    })
    .join("");

  nextPageButton.disabled = currentPage >= totalPages;
  prevPageButton.disabled = currentPage <= 1;
  currentPageSpan.innerText = currentPage;
};

const searchAndRender = (searchTerm) => {
  let resultsToShow = [...resultsData];
  if (searchTerm) {
    resultsToShow = resultsData.filter((result) => {
      return result.content.includes(searchTerm);
    });
  }
  renderResults(resultsToShow);
};

searchAndRender(currentSearchTerm);

//listners
searchInput.addEventListener("input", (e) => {
  currentSearchTerm = e.target.value;
  currentPage = 1;
  searchAndRender(currentSearchTerm);
});

prevPageButton.addEventListener("click", () => {
    currentPage--;
  searchAndRender(currentSearchTerm);
});
nextPageButton.addEventListener("click", () => {
    currentPage++;
  searchAndRender(currentSearchTerm);
});
