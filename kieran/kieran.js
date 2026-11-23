let pages = document.querySelectorAll(".text-page");
let prevBtn = document.getElementById("prev-btn");
let nextBtn = document.getElementById("next-btn");
let indicator = document.getElementById("page-indicator");

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