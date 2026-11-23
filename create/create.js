let bioInput = document.getElementById("char-bio");
let charCounter = document.getElementById("char-counter");
let photoInput = document.getElementById("char-photo");
let previewImg = document.getElementById("preview-img");
let placeholderText = document.getElementById("upload-placeholder");
let form = document.getElementById("create-char-form");

let uploadedImageBase64 = "";


let urlParams = new URLSearchParams(window.location.search);
let editIndex = urlParams.get("edit");
let isEditMode = (editIndex !== null);
let savedCharacters = JSON.parse(localStorage.getItem("customCharacters")) || [];


if (isEditMode && savedCharacters[editIndex]) {
    let charToEdit = savedCharacters[editIndex];

    
    document.querySelector(".scroll-content h2").innerText = "Редактирование досье";
    document.querySelector(".save-btn").innerText = "Сохранить изменения ✒️";

   
    document.getElementById("char-name").value = charToEdit.name;
    document.getElementById("char-status").value = charToEdit.status;
    document.getElementById("char-universe").value = charToEdit.universe;
    document.getElementById("char-abilities").value = charToEdit.abilities;
    bioInput.value = charToEdit.bio;

   
    let approxPages = Math.max(1, Math.ceil(bioInput.value.length / 350));
    charCounter.innerText = `${bioInput.value.length} симв. (~${approxPages} стр.)`;

    
    uploadedImageBase64 = charToEdit.photo;
    previewImg.src = uploadedImageBase64;
    previewImg.style.display = "block";
    placeholderText.style.display = "none";
    photoInput.removeAttribute("required");
}


bioInput.addEventListener("input", function() {
    let length = bioInput.value.length;
    let approxPages = Math.max(1, Math.ceil(length / 350));
    charCounter.innerText = `${length} симв. (~${approxPages} стр.)`;
});


photoInput.addEventListener("change", function() {
    let file = photoInput.files;
    if (file) {
        let reader = new FileReader();
        reader.onload = function(event) {
            uploadedImageBase64 = event.target.result;
            previewImg.src = uploadedImageBase64;
            previewImg.style.display = "block";
            placeholderText.style.display = "none";
        };
        reader.readAsDataURL(file);
    }
});


form.addEventListener("submit", function(event) {
    event.preventDefault();

    let characterData = {
        name: document.getElementById("char-name").value.trim(),
        status: document.getElementById("char-status").value.trim(),
        universe: document.getElementById("char-universe").value.trim(),
        abilities: document.getElementById("char-abilities").value.trim(),
        bio: bioInput.value.trim(),
        photo: uploadedImageBase64
    };

    if (isEditMode && savedCharacters[editIndex]) {
        
        savedCharacters[editIndex] = characterData;
        localStorage.setItem("customCharacters", JSON.stringify(savedCharacters));
        window.location.href = `customcards.html?id=${editIndex}`;
    } else {
      
        savedCharacters.push(characterData);
        localStorage.setItem("customCharacters", JSON.stringify(savedCharacters));
        window.location.href = "customcards.html";
    }
});
