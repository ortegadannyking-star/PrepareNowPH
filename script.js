// ==========================
// FAQ ACCORDION
// ==========================

const accordions = document.querySelectorAll(".accordion");

accordions.forEach(button => {

    button.addEventListener("click", function(){

        this.classList.toggle("active");

        const panel = this.nextElementSibling;

        if(panel.style.display === "block"){

            panel.style.display = "none";

        }else{

            panel.style.display = "block";

        }

    });

});

// ==========================
// SMOOTH SCROLL
// ==========================

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({

            behavior:"smooth"

        });

    });

});

// ==========================
// SCROLL ANIMATION
// ==========================

const cards = document.querySelectorAll(".card,.box,.status-card");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{threshold:0.2});

cards.forEach(card=>{

    observer.observe(card);

});

// ==========================
// ACTIVE NAVIGATION
// ==========================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll",()=>{

    let current = "";

    sections.forEach(section=>{

        const sectionTop = section.offsetTop - 150;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});

// ==========================
// BACK TO TOP BUTTON
// ==========================

const topBtn = document.createElement("button");

topBtn.innerHTML = "⬆";

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

topBtn.style.position = "fixed";
topBtn.style.bottom = "25px";
topBtn.style.right = "25px";
topBtn.style.width = "50px";
topBtn.style.height = "50px";
topBtn.style.border = "none";
topBtn.style.borderRadius = "50%";
topBtn.style.background = "#ff7a00";
topBtn.style.color = "#fff";
topBtn.style.fontSize = "22px";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";
topBtn.style.boxShadow = "0 5px 15px rgba(0,0,0,.3)";
topBtn.style.zIndex = "1000";

window.addEventListener("scroll",()=>{

    if(window.scrollY > 400){

        topBtn.style.display = "block";

    }else{

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

// ==========================
// HERO BUTTON EFFECT
// ==========================

const buttons = document.querySelectorAll(".btn");

buttons.forEach(button=>{

    button.addEventListener("mouseenter",()=>{

        button.style.transform="scale(1.05)";

    });

    button.addEventListener("mouseleave",()=>{

        button.style.transform="scale(1)";

    });

});

// ==========================
// PAGE LOAD ANIMATION
// ==========================

window.onload = ()=>{

    document.body.style.opacity = "1";

};