let charactersList = document.querySelector(".characters-list");
let savedCharacters = JSON.parse(localStorage.getItem("customCharacters")) || [];
let baseCount = charactersList.querySelectorAll(".char-item").length;


for (let i = 0; i < savedCharacters.length; i++) {
    let char = savedCharacters[i];
    let number = baseCount + i + 1;

    let newItemHTML = `
        <li class="char-item">
            <div class="char-row">
                <a href="../create/customcards.html?id=${i}" class="char-name">${number}. ${char.name}</a>
                <button class="toggle-feather" title="Показать краткие сведения">
                    <img src="feather.png" alt="Сведения">
                </button>
                <a href="../create/create.html?edit=${i}" class="edit-btn" title="Редактировать карточку">✎</a>
                <button class="delete-btn" data-index="${i}" title="Удалить карточку">✕</button>
            </div>
            <div class="char-details">
                <p>* Вселенная: ${char.universe}</p>
                <p>* Статус: ${char.status}</p>
            </div>
        </li>
    `;
    charactersList.innerHTML += newItemHTML;
}


let featherButtons = document.querySelectorAll(".toggle-feather");
for (let i = 0; i < featherButtons.length; i++) {
    featherButtons[i].addEventListener("click", function() {
        let parentItem = this.closest(".char-item");
        parentItem.classList.toggle("open");
    });
}


let deleteButtons = document.querySelectorAll(".delete-btn");
for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", function() {
        
        let indexToDelete = Number(this.getAttribute("data-index"));
        let charName = savedCharacters[indexToDelete].name;

        
        if (confirm(`Точно удалить персонажа «${charName}» из Глоссария?`)) {
            savedCharacters.splice(indexToDelete, 1); 
            localStorage.setItem("customCharacters", JSON.stringify(savedCharacters)); 
            location.reload(); 
        }
    });
}


let allCharItems = document.querySelectorAll(".char-item");
let paginationBox = document.getElementById("list-pagination");
let prevBtn = document.getElementById("list-prev");
let nextBtn = document.getElementById("list-next");
let pagInfo = document.getElementById("list-pag-info");

let itemsPerPage = 5;
let currentPage = 1;
let totalPages = Math.ceil(allCharItems.length / itemsPerPage);

function showListPage(page) {
    for (let i = 0; i < allCharItems.length; i++) {
        allCharItems[i].style.display = "none";
    }

    let startIndex = (page - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;

    for (let i = startIndex; i < endIndex && i < allCharItems.length; i++) {
        allCharItems[i].style.display = "block";
    }

    if (totalPages > 1) {
        paginationBox.style.display = "flex";
        pagInfo.innerText = `${page} / ${totalPages}`;
        prevBtn.disabled = (page === 1);
        nextBtn.disabled = (page === totalPages);
    } else {
        paginationBox.style.display = "none";
    }
}

prevBtn.addEventListener("click", function() {
    if (currentPage > 1) {
        currentPage--;
        showListPage(currentPage);
    }
});

nextBtn.addEventListener("click", function() {
    if (currentPage < totalPages) {
        currentPage++;
        showListPage(currentPage);
    }
});

showListPage(currentPage);