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


// form features

// show-hide pswd
function togglePassword(){
    const password = document.getElementById("pswd");

    if(password.type=="password"){
        password.type = "text";
    } else {
        password.type = "password";
    }
}

// password strength meter
const pswd = document.getElementById("pswd");

const strength = document.getElementById("strength");

pswd.addEventListener("input", function(){
    let value = pswd.value;

    if(value.length<6){
        strength.innerHTML = "Weak";
        strength.style.color = "red";
    } else if(value.match(/[A-Z]/) && value.match(/[0-9]/) && value.match(/[@$!*%?&]/)){
        strength.innerHTML = "Strong";
        strength.style.color = "green";
    }else {
        strength.innerHTML = "Medium";
        strength.style.color = "orange";     
    }
});

// pswd match
const confirmPswd = document.getElementById("cpswd");
const match = document.getElementById("match");

confirmPswd.addEventListener("input", function(){
    if(pswd.value==confirmPswd.value){
            match.innerHTML = "<i class=\"fa-solid fa-check\"></i>Password Matched";
            match.style.color = "green";
        } else {
            match.innerHTML = "<i class=\"fa-solid fa-xmark\"></i>Password Not Matched";
            match.style.color = "red";
        }
});

// btn loading & success msg
const btn = document.querySelector(".btn");

btn.addEventListener("click", function(){
    btn.innerHTML = "Registering...";
    btn.disabled = true;

    setTimeout(function(){
        btn.innerHTML = "Register";
        btn.disabled = false;

        document.getElementById("successMsg").innerHTML = "<i class=\"fa-solid fa-check-double\"></i> Registeration Successful !!";
        document.getElementById("successMsg").style.color = "green";
        alert("Registered Successfully !!");
    },2000);
});