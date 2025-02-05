// let circle = document.querySelector("circle");
// console.log(circle.getTotalLength());

// let forward = document.querySelector("line.forward");
// console.log(forward.getTotalLength());

let timeoutId = null;
let count = 0;
let game = document.querySelector(".game");
let result = document.querySelector(".result");
let btnGame = document.querySelector(".new-game");
let fields = document.querySelectorAll(".field");
const filledCells = new Map();

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
    const clazz = e?.target?.classList[1];

    if (!clazz) return;

    if (filledCells.size === 0) {
        const pseudo = Math.floor(Math.random(2) + 0.5);

        if (pseudo === 0) {
            stepZero(e?.target);
            filledCells.set(clazz, "o");
        }
        else {
            stepCross(e?.target);
            filledCells.set(clazz, "x");
        }

        step = !step;
    }
    else {
        if (filledCells.has(clazz)) return;

        if (filledCells.size === 1) {
            const firstValue = Array.from(filledCells)[0][1];

            if (firstValue === "x") {
                stepZero(e?.target);
                filledCells.set(clazz, "o");
            }
            else {
                stepCross(e?.target);
                filledCells.set(clazz, "x");
            }

            step = !step;
        }
        else {
            if (!step) {
                stepCross(e?.target);
                filledCells.set(clazz, "x");
            }
            else {
                stepZero(e?.target);
                filledCells.set(clazz, "o");
            }
        
            step = !step;
            win();
        }
    }
}

function stepCross(data) {
    data.innerHTML = cross;
    data.classList.add('x');
    const crossSound = new Audio("audio/cross.mp3");
    crossSound.play();
    count++;
}

function stepZero(data) {
    data.innerHTML = circle;
    data.classList.add('o');
    const circleSound = new Audio("audio/zero.mp3");
    circleSound.play();
    count++;
}

function newGame() {
    window.location.reload();
}

function win() {
    const winCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    if (fields != null) {
        for (let i = 0; i < winCombinations.length; i++) {
            if (fields[winCombinations[i][0]].classList.contains("x") && 
                fields[winCombinations[i][1]].classList.contains("x") &&
                fields[winCombinations[i][2]].classList.contains("x")
                ) {
                    timeoutId = setTimeout(() => {
                        fields[winCombinations[i][0]].classList.add("active");
                        fields[winCombinations[i][1]].classList.add("active");
                        fields[winCombinations[i][2]].classList.add("active");

                        if (result != null) {
                            result.innerHTML = "You won with X!";
                        }
                    }, 1500);

                    if (game != null) {
                        game.removeEventListener("click", init);
                    }
                }
            
            if (fields[winCombinations[i][0]].classList.contains("o") && 
                fields[winCombinations[i][1]].classList.contains("o") &&
                fields[winCombinations[i][2]].classList.contains("o")
                ) {
                    timeoutId = setTimeout(() => {
                        fields[winCombinations[i][0]].classList.add("active");
                        fields[winCombinations[i][1]].classList.add("active");
                        fields[winCombinations[i][2]].classList.add("active");

                        if (result != null) {
                            result.innerHTML = "You won with O!";
                        }
                    }, 1500);

                    if (game != null) {
                        game.removeEventListener("click", init);
                    }
            }

            if (count === 9) {
                if (result != null) {
                    result.innerHTML = "Dead heat";
                }

                if (game != null) {
                    game.removeEventListener("click", init);
                }
            }
        }
    }
}

if (btnGame != null) {
    btnGame.addEventListener('click', newGame);
}

if (game != null) {
    game.addEventListener('click', init);
}