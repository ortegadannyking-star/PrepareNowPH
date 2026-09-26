/* =========================
   MOBILE MENU
========================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("show");

        const icon = menuToggle.querySelector("i");

        if (navLinks.classList.contains("show")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

}


/* =========================
   CLOSE MOBILE MENU
========================= */

const navItems = document.querySelectorAll(".nav-link");

navItems.forEach(function (link) {

    link.addEventListener("click", function () {

        if (navLinks) {
            navLinks.classList.remove("show");
        }

        if (menuToggle) {

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        }

    });

});


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navItems.forEach(function (link) {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {

            link.classList.add("active");

        }

    });

});


/* =========================
   BACK TO TOP
========================= */

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================
   SCROLL ANIMATION
========================= */

const animatedElements = document.querySelectorAll(
    ".info-card, .issue-card, .program-card, .resource-card, .news-card, .team-card, .gallery-item"
);


if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    animatedElements.forEach(function (element) {

        observer.observe(element);

    });

} else {

    animatedElements.forEach(function (element) {

        element.classList.add("visible");

    });

}


/* =========================
   CONTACT FORM
========================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const nameElement = document.getElementById("name");
        const emailElement = document.getElementById("email");
        const subjectElement = document.getElementById("subject");
        const messageElement = document.getElementById("message");

        const name = nameElement ? nameElement.value.trim() : "";
        const email = emailElement ? emailElement.value.trim() : "";
        const subject = subjectElement ? subjectElement.value.trim() : "";
        const message = messageElement ? messageElement.value.trim() : "";


        if (!name || !email || !subject || !message) {

            alert("Please fill in all the fields.");

            return;

        }


        alert(
            "Thank you, " +
            name +
            "! Your message has been received."
        );


        contactForm.reset();

    });

}


/* =========================
   CURRENT YEAR
========================= */

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


/* =========================
   BUTTON HOVER EFFECT
========================= */

const buttons = document.querySelectorAll(".btn");

buttons.forEach(function (button) {

    button.addEventListener("mouseenter", function () {

        button.style.transition = "0.3s";

    });

});


/* =========================
   PAGE LOAD
========================= */

window.addEventListener("load", function () {

    document.body.classList.add("loaded");

});


/* =========================================================
   PREPARENOW PH - WEBSITE ENTRY SCREEN
========================================================= */

const entryScreen = document.getElementById("entryScreen");
const enterButton = document.getElementById("enterButton");

if (entryScreen && enterButton) {

    document.body.classList.add("entry-locked");

    enterButton.addEventListener("click", function () {

        entryScreen.classList.add("exit");

        document.body.classList.remove("entry-locked");

    });

}


/* =========================================================
   PREPARENOW PH - GO-BAG CHECKLIST
========================================================= */

const goBagItems = document.querySelectorAll(
    '#goBagChecklist input[type="checkbox"]'
);

const progressBar = document.getElementById("goBagProgress");
const progressText = document.getElementById("goBagProgressText");


function updateGoBagProgress() {

    if (!goBagItems.length) {
        return;
    }

    let checkedItems = 0;

    goBagItems.forEach(function (item) {

        if (item.checked) {

            checkedItems++;

        }

    });


    const totalItems = goBagItems.length;

    const percentage = Math.round(
        (checkedItems / totalItems) * 100
    );


    if (progressBar) {

        progressBar.style.width = percentage + "%";

    }


    if (progressText) {

        progressText.textContent =
            percentage + "% Complete";

    }

}


/* =========================
   SAVE CHECKLIST
========================= */

function saveGoBagChecklist() {

    const checklistState = [];

    goBagItems.forEach(function (item) {

        checklistState.push(item.checked);

    });


    localStorage.setItem(
        "prepareNowGoBagChecklist",
        JSON.stringify(checklistState)
    );

}


/* =========================
   LOAD CHECKLIST
========================= */

function loadGoBagChecklist() {

    const savedChecklist =
        localStorage.getItem("prepareNowGoBagChecklist");


    if (!savedChecklist) {

        updateGoBagProgress();

        return;

    }


    try {

        const checklistState =
            JSON.parse(savedChecklist);


        goBagItems.forEach(function (item, index) {

            if (checklistState[index] === true) {

                item.checked = true;

            }

        });

    } catch (error) {

        console.log("Unable to load saved checklist.");

    }


    updateGoBagProgress();

}


/* =========================
   CHECKLIST EVENTS
========================= */

goBagItems.forEach(function (item) {

    item.addEventListener("change", function () {

        updateGoBagProgress();

        saveGoBagChecklist();

    });

});


/* =========================
   INITIALIZE CHECKLIST
========================= */

loadGoBagChecklist();


/* =========================================================
   CHECKLIST ITEM HIGHLIGHT
========================================================= */

goBagItems.forEach(function (checkbox) {

    checkbox.addEventListener("change", function () {

        const parentItem =
            checkbox.closest(".checklist-item");


        if (!parentItem) {
            return;
        }


        if (checkbox.checked) {

            parentItem.classList.add("checked");

        } else {

            parentItem.classList.remove("checked");

        }

    });

});


/* =========================
   RESTORE CHECKED STYLES
========================= */

goBagItems.forEach(function (checkbox) {

    const parentItem =
        checkbox.closest(".checklist-item");


    if (
        checkbox.checked &&
        parentItem
    ) {

        parentItem.classList.add("checked");

    }

});


/* =========================================================
   EXTERNAL LINKS
========================================================= */

const externalLinks =
    document.querySelectorAll('a[target="_blank"]');


externalLinks.forEach(function (link) {

    link.setAttribute(
        "rel",
        "noopener noreferrer"
    );

});


/* =========================================================
   PREPARENOW PH - SMOOTH ANCHOR LINKS
========================================================= */

const anchorLinks =
    document.querySelectorAll('a[href^="#"]');


anchorLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId =
            link.getAttribute("href");


        if (
            !targetId ||
            targetId === "#"
        ) {

            return;

        }


        const target =
            document.querySelector(targetId);


        if (target) {

            event.preventDefault();

            const headerOffset = 80;

            const elementPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset;

            const offsetPosition =
                elementPosition - headerOffset;


            window.scrollTo({

                top: offsetPosition,

                behavior: "smooth"

            });

        }

    });

});


/* =========================================================
   PREPARENOW PH - GO-BAG COMPLETE MESSAGE
========================================================= */

function checkGoBagCompletion() {

    if (!goBagItems.length) {
        return;
    }


    let completed = 0;

    goBagItems.forEach(function (item) {

        if (item.checked) {

            completed++;

        }

    });


    if (
        completed === goBagItems.length &&
        goBagItems.length > 0
    ) {

        console.log(
            "Great job! Your go-bag checklist is complete."
        );

    }

}


goBagItems.forEach(function (item) {

    item.addEventListener("change", function () {

        checkGoBagCompletion();

    });

});


/* =========================================================
   PREPARENOW PH - REDUCED MOTION SUPPORT
========================================================= */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (prefersReducedMotion.matches) {

    document.documentElement.style.scrollBehavior = "auto";

}
