const quotes = [
`"Motivation is what gets you started. Habit is what keeps you going."
— Jim Ryun`,
`"Take care of your body. It’s the only place you have to live."
— Jim Rohn`
];

function typeWriter(element, text, speed, callback) {
    let i = 0;
    element.innerHTML = "";

    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        } else {
            setTimeout(callback, 2000);
        }
    }

    typing();
}

function startLoop() {
    typeWriter(document.getElementById("quote1"), quotes[0], 40, () => {
        typeWriter(document.getElementById("quote2"), quotes[1], 40, () => {
            setTimeout(startLoop, 3000);
        });
    });
}

window.onload = startLoop;
