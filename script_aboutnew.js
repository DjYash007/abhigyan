// Scroll Reveal Animation

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    reveals.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if(sectionTop < triggerBottom){
            section.classList.add("show");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Counter Animation

function animateValue(id, end, duration) {
    let start = 0;
    let increment = end / (duration / 16);
    let obj = document.getElementById(id);

    let timer = setInterval(function() {
        start += increment;
        if(start >= end){
            start = end;
            clearInterval(timer);
        }
        obj.textContent = id === "growth" ? Math.floor(start) + "%" : Math.floor(start);
    }, 16);
}

window.addEventListener("load", function(){
    animateValue("users", 1200, 2000);
    animateValue("plans", 3500, 2000);
    animateValue("growth", 94, 2000);
});
