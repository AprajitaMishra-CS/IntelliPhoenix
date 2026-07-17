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

// counter
const counters = document.querySelectorAll(".count");
const speed = 100;

counters.forEach((counter)=>{
    const updateCount = ()=>{
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = Math.ceil(target/speed);

        if(count<target){
            counter.innerText = count + increment;

            setTimeout(updateCount, 20);
        } else {
            if(target==95){
                counter.innerText = target + "%";
            } else {
                counter.innerText = target + "+";
            }
        }
    };
    updateCount();
});

// scroll up (topBtn)
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