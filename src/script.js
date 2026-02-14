const quote1Text = `"Motivation is what gets you started. Habit is what keeps you going."
— Jim Ryun`;

const quote2Text = `"Take care of your body. It’s the only place you have to live."
— Jim Rohn`;

function typeEffect(element, text, speed) {
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

window.onload = function() {
    typeEffect(document.getElementById("quote1"), quote1Text, 40);
    setTimeout(() => {
        typeEffect(document.getElementById("quote2"), quote2Text, 40);
    }, 4000);
};
