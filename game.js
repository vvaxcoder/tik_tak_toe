// let circle = document.querySelector("circle");
// console.log(circle.getTotalLength());

// let forward = document.querySelector("line.forward");
// console.log(forward.getTotalLength());

let game = document.querySelector(".game");
let result = document.querySelector(".result");
let btnGame = document.querySelector(".new-game");
let fields = document.querySelectorAll(".field");
let step = false;
let circle = `
            <svg class="circle">
                <circle 
                    r="45" cx="58" cy="58" 
                    stroke="blue" stroke-width="10"
                    fill="none"
                    stroke-linecap="round" />
            </svg>`;
let cross = `
            <svg class="cross">
                <line class="forward" x1="15" y1="15" x2="100" y2="100" stroke="red" stroke-width="10" stroke-linecap="round" />
                <line class="backward" x1="100" y1="15" x2="15" y2="100" stroke="red" stroke-width="10" stroke-linecap="round" />
            </svg>
            `;

function init(e) {    
    if (!step) {
        stepCross(e?.target);
    }
    else {
        stepZero(e?.target);
    }

    step = !step;
    win();
}

function stepCross(data) {
    data.innerHTML = cross;
    const crossSound = new Audio("audio/cross.mp3");
    crossSound.play();
}

function stepZero(data) {
    data.innerHTML = circle;
    const circleSound = new Audio("audio/zero.mp3");
    circleSound.play();
}

function newGame() {

}

function win() {

}

if (btnGame != null) {
    btnGame.addEventListener('click', newGame);
}

if (game != null) {
    game.addEventListener('click', init);
}