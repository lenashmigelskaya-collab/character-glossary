let randomBtn = document.getElementById("random-char-btn");


let characterPages = [
    "vi/vi.html",
    "kieran/kieran.html",
    "symmetra/sym.html",
    "anton/anton.html",
    "leone/leone.html"
];

randomBtn.addEventListener("click", function(event) {
    event.preventDefault(); 
    let randomIndex = Math.floor(Math.random() * characterPages.length);
    window.location.href = characterPages[randomIndex];
});