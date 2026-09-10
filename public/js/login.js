// sidebar
const menu = document.querySelector(".menuIcon");
const nav = document.querySelector(".navRight");
const overlay = document.querySelector(".overlay");

menu.addEventListener("click", ()=>{
    menu.classList.toggle("active");
    nav.classList.toggle("active");
    overlay.classList.toggle("show");
});

overlay.addEventListener("click", ()=>{
    menu.classList.remove("active");
    nav.classList.remove("active");
    overlay.classList.remove("show");
});

let nvRight = document.querySelectorAll(".navRight a");

nvRight.forEach((link)=>{
    link.addEventListener("click",()=>{
        menu.classList.remove("active");
        nav.classList.remove("active");
        overlay.classList.remove("show");
    });
});

// form input hover
const form = document.querySelector("form");

form.addEventListener("click",(e)=>{
    e.stopPropagation();
    form.classList.add("active");
});

document.addEventListener("click",()=>{
    form.classList.remove("active");
});
