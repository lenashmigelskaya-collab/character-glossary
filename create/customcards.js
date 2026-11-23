let savedCharacters = JSON.parse(localStorage.getItem("customCharacters")) || [];
let urlParams = new URLSearchParams(window.location.search);
let charIndex = urlParams.get("id") !== null ? Number(urlParams.get("id")) : savedCharacters.length - 1;
let character = savedCharacters[charIndex];

let pagesContainer = document.getElementById("dynamic-pages-container");
let prevBtn = document.getElementById("prev-btn");
let nextBtn = document.getElementById("next-btn");
let indicator = document.getElementById("page-indicator");


function splitTextIntoChunks(text, maxChars) {
    let chunks = [];
    let remaining = text.trim();

    while (remaining.length > 0) {
        if (remaining.length <= maxChars) {
            chunks.push(remaining);
            break;
        }
       
        let cutIndex = remaining.lastIndexOf(" ", maxChars);
        if (cutIndex === -1) cutIndex = maxChars; 

        chunks.push(remaining.slice(0, cutIndex).trim());
        remaining = remaining.slice(cutIndex).trim();
    }
    return chunks;
}

if (character) {
    
    document.getElementById("header-subtitle").innerText = `ДОСЬЕ ПЕРСОНАЖА: ${character.name.toUpperCase()}`;
    document.getElementById("char-portrait").src = character.photo;

    
    let firstPageBioLimit = 220;
    let nextPagesBioLimit = 480;

    let firstChunk = "";
    let restText = character.bio;

    if (restText.length <= firstPageBioLimit) {
        firstChunk = restText;
        restText = "";
    } else {
        let cut = restText.lastIndexOf(" ", firstPageBioLimit);
        if (cut === -1) cut = firstPageBioLimit;
        firstChunk = restText.slice(0, cut).trim();
        restText = restText.slice(cut).trim();
    }

    
    let page1HTML = `
        <div class="text-page active">
            <h2>${character.name}</h2>
            <p><strong>Статус:</strong> ${character.status}</p>
            <p><strong>Вселенная:</strong> ${character.universe}</p>
            <p class="block-gap"><strong>Способности:</strong> ${character.abilities}</p>
            <p class="bio">${firstChunk}</p>
        </div>
    `;
    pagesContainer.innerHTML += page1HTML;

    
    if (restText.length > 0) {
        let extraChunks = splitTextIntoChunks(restText, nextPagesBioLimit);
        for (let i = 0; i < extraChunks.length; i++) {
            pagesContainer.innerHTML += `
                <div class="text-page">
                    <h2>История и подробности (ч. ${i + 2})</h2>
                    <p class="bio">${extraChunks[i]}</p>
                </div>
            `;
        }
    }
}


let pages = document.querySelectorAll(".text-page");
let currentPage = 0;

function showPage(index) {
    for (let i = 0; i < pages.length; i++) {
        pages[i].classList.remove("active");
    }
    pages[index].classList.add("active");
    indicator.innerText = `${index + 1} / ${pages.length}`;
    prevBtn.disabled = (index === 0);
    nextBtn.disabled = (index === pages.length - 1);
}


if (pages.length > 0) {
    showPage(0);
}

nextBtn.addEventListener("click", function() {
    if (currentPage < pages.length - 1) {
        currentPage++;
        showPage(currentPage);
    }
});

prevBtn.addEventListener("click", function() {
    if (currentPage > 0) {
        currentPage--;
        showPage(currentPage);
    }
});
let downloadBtn = document.getElementById("download-btn");

if (downloadBtn && character) {
    downloadBtn.addEventListener("click", function() {
       
        let standaloneHTML = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Досье: ${character.name}</title>
    <style>
        body {
            background-color: #0b0b0d;
            color: #e2e2e6;
            font-family: 'Georgia', serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }
        .card {
            max-width: 800px;
            background-color: #141418;
            border: 1px solid #4a151e;
            border-left: 5px solid #8b1e2f;
            border-radius: 6px;
            padding: 30px;
            display: flex;
            gap: 25px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.9);
        }
        .info { flex: 1; line-height: 1.6; }
        h1 { color: #b8253c; margin-top: 0; }
        strong { color: #b8253c; }
        .bio { margin-top: 15px; font-style: italic; color: #c8c8d0; white-space: pre-line; }
        .photo img {
            width: 240px;
            height: 240px;
            object-fit: cover;
            border: 2px solid #4a151e;
            filter: grayscale(100%) contrast(115%);
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="info">
            <h1>${character.name}</h1>
            <p><strong>Статус:</strong> ${character.status}</p>
            <p><strong>Вселенная:</strong> ${character.universe}</p>
            <p><strong>Способности:</strong> ${character.abilities}</p>
            <div class="bio">${character.bio}</div>
        </div>
        <div class="photo">
            <img src="${character.photo}" alt="${character.name}">
        </div>
    </div>
</body>
</html>`;

        
        let blob = new Blob([standaloneHTML], { type: "text/html;charset=utf-8" });
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${character.name.toLowerCase().replace(/\s+/g, "_")}_card.html`;
        
        link.click();
        URL.revokeObjectURL(link.href); 
    });
}