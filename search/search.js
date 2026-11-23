let searchList = document.getElementById("search-list");
let savedCharacters = JSON.parse(localStorage.getItem("customCharacters")) || [];

for (let i = 0; i < savedCharacters.length; i++) {
    let char = savedCharacters[i];
    searchList.innerHTML += `
        <li class="search-item">
            <a href="../create/customcards.html?id=${i}" class="char-link">
                <span class="char-title">${char.name}</span>
                <span class="char-universe">${char.universe}</span>
            </a>
        </li>
    `;
}


let searchInput = document.getElementById("search-input");
let allItems = Array.from(document.querySelectorAll(".search-item"));
let noResultsMsg = document.getElementById("no-results");

let paginationBox = document.getElementById("pagination");
let prevBtn = document.getElementById("pag-prev");
let nextBtn = document.getElementById("pag-next");
let pagInfo = document.getElementById("pag-info");

let itemsPerPage = 5; 
let currentPage = 1;
let filteredItems = allItems; 


function renderList() {
    
    for (let i = 0; i < allItems.length; i++) {
        allItems[i].style.display = "none";
    }

    
    if (filteredItems.length === 0) {
        noResultsMsg.style.display = "block";
        paginationBox.style.display = "none";
        return;
    }

    noResultsMsg.style.display = "none";

    
    let totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    if (currentPage > totalPages) currentPage = totalPages;

    let startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;

    
    for (let i = startIndex; i < endIndex && i < filteredItems.length; i++) {
        filteredItems[i].style.display = "block";
    }

    
    if (totalPages > 1) {
        paginationBox.style.display = "flex";
        pagInfo.innerText = `${currentPage} / ${totalPages}`;
        prevBtn.disabled = (currentPage === 1);
        nextBtn.disabled = (currentPage === totalPages);
    } else {
        paginationBox.style.display = "none";
    }
}


searchInput.addEventListener("input", function() {
    let query = searchInput.value.toLowerCase().trim();
    
    
    filteredItems = allItems.filter(function(item) {
        let charName = item.querySelector(".char-title").innerText.toLowerCase();
        return charName.includes(query);
    });

    currentPage = 1; 
    renderList();
});


prevBtn.addEventListener("click", function() {
    if (currentPage > 1) {
        currentPage--;
        renderList();
    }
});

nextBtn.addEventListener("click", function() {
    let totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderList();
    }
});


renderList();
