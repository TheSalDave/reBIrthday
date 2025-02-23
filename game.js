let rebi = document.getElementById('rebi');
let game = document.getElementById('game');
let timerDisplay = document.getElementById('timer');
let scoreDisplay = document.getElementById('score');

let gameInterval;
let objectsInterval;
let gameDuration = 60; // 60 seconds
let timer = gameDuration;
let score = 0;
let rebiSpeed = 1;
let rebiPosition = 50; // in percentage
let isMovingLeft = false;
let isMovingRight = false;

function startGame() {
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    gameInterval = setInterval(updateGame, 1000 / 60);
    objectsInterval = setInterval(createObject, 300);
}

function updateGame() {
    moverebi();
    moveObjects();
    detectCollisions();
}

function handleMouseDown(e) {
    if (e.x < window.innerWidth / 2) {
        isMovingLeft = true;
    } else {
        isMovingRight = true;
    }
}

function handleMouseUp(e) {
    isMovingLeft = false;
    isMovingRight = false;
}

function handleTouchStart(e) {
    const touchX = e.touches[0].clientX;
    if (touchX < window.innerWidth / 2) {
        isMovingLeft = true;
    } else {
        isMovingRight = true;
    }
}

function handleTouchEnd(e) {
    isMovingLeft = false;
    isMovingRight = false;
}

function handleKeyDown(e) {
    console.log("Key down:", e.key); // Debugging log
    if (e.key === 'ArrowLeft') {
        isMovingLeft = true;
    } else if (e.key === 'ArrowRight') {
        isMovingRight = true;
    }
}

function handleKeyUp(e) {
    if (e.key === 'ArrowLeft') {
        isMovingLeft = false;
    } else if (e.key === 'ArrowRight') {
        isMovingRight = false;
    }
}

function moverebi() {
    if (isMovingLeft) {
        rebiPosition -= rebiSpeed;
    } else if (isMovingRight) {
        rebiPosition += rebiSpeed;
    }
    rebiPosition = Math.max(0, Math.min(100, rebiPosition));
    rebi.style.left = rebiPosition + 'vw';
}

function createObject() {
    let object = document.createElement('div');
    object.classList.add('object');
    let isGood = Math.random() < 0.5;
    object.style.backgroundImage = isGood ? "url('img/cake.svg')" : "url('img/poo.svg')";
    object.dataset.isGood = isGood;
    object.style.left = Math.random() * 100 + 'vw';
    object.style.top = '0px';
    game.appendChild(object);
}

function moveObjects() {
    document.querySelectorAll('.object').forEach(obj => {
        let top = parseFloat(obj.style.top);
        top += 5; // Falling speed
        obj.style.top = top + 'px';

        if (top > window.innerHeight) {
            obj.remove();
        }
    });
}

function detectCollisions() {
    let rebiRect = rebi.getBoundingClientRect();

    document.querySelectorAll('.object').forEach(obj => {
        let objRect = obj.getBoundingClientRect();

        if (
            objRect.left < rebiRect.right &&
            objRect.right > rebiRect.left &&
            objRect.bottom > rebiRect.top &&
            objRect.top < rebiRect.bottom
        ) {
            score += obj.dataset.isGood === 'true' ? 1 : -2;
            scoreDisplay.textContent = 'Score: ' + score;
            obj.remove();
        }
    });

    if(score == 22 || score <=-22){
        endGame()
    }

}


// Not used naymore
function updateTimer() {
    timerDisplay.textContent = timer;
    if (timer > 0) {
        timer--;
        setTimeout(updateTimer, 1000);
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(objectsInterval);
    window.location.href = 'end.html?result=' + score;
}

startGame();
