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

// scroll to top button
const topBtn = document.querySelector("#topBtn");

window.onscroll = function(){
    if(document.body.scrollTop>300 || document.documentElement.scrollTop>300){
        topBtn.style.display = "block";
    }
    else {
        topBtn.style.display = "none";
    }
}

topBtn.onclick = function(){
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// form input hover
const form = document.querySelector("form");

form.addEventListener("click",(e)=>{
    e.stopPropagation();
    form.classList.add("active");
});

document.addEventListener("click",()=>{
    form.classList.remove("active");
});

// faqs section
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item)=>{
    const question = item.querySelector(".faq-question");

    question.addEventListener("click",()=>{
        item.classList.toggle("active");
    });
});