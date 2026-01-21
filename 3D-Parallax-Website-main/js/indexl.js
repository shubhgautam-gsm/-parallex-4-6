const parallax_el = document.querySelectorAll(".parallax");
let xvalue = 0, yvalue = 0;
let rotateDegree = 0;

window.addEventListener("mousemove", (e) => {
    if(tl.isActive()) return; // Corrected the typo here
    xvalue = e.clientX - window.innerWidth / 2;
    yvalue = e.clientY - window.innerHeight / 2;
    rotateDegree = (xvalue / (window.innerWidth / 2)) * 20;
    parallax_el.forEach(el => {
        let speedx = parseFloat(el.dataset.speedx) || 1;
        let speedy = parseFloat(el.dataset.speedy) || 1;
        let speedz = parseFloat(el.dataset.speedz) || 1;
        const test = document.querySelector(".mountain-2");

        let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
        let zvalue = (e.clientX - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

        el.style.transform = `translateX(calc(-50% + ${-xvalue * speedx}px)) translateY(calc(-50% + ${yvalue * speedy}px)) perspective(2300px) translateZ(${zvalue * speedz}px) rotateY(${rotateDegree}deg)`;
    });
});

let tl = gsap.timeline();
Array.from(parallax_el).filter(el => !el.classList.contains("text")).forEach(el => {
    tl.from(el,
        {
            top: `${el.offsetHeight / 2 + +el.dataset.distance}px`,
            duration: 3.5,
        },
        "1");
});

tl.from(".text h1", {
    y: window.innerHeight - document.querySelector(".text h1").getBoundingClientRect().top + 200,
    duration: 2,
}, "2.5").from(".text h2", {
    y: -150,
    opacity: 0,
    duration: 1.5,
}, "3").from(".hide", {
    opacity: 0,
    duration: 1.5,
}, "3");
