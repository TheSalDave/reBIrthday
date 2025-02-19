document.addEventListener('DOMContentLoaded', () => {
    const scoreElement = document.getElementById('score-statement');
    const presentButton = document.getElementById('present-button');
    const endText = document.getElementById('end');
    const presentText = document.getElementById('present-text');

    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const score = parseInt(urlParams.get('result'), 10);

    // Display the score
    scoreElement.textContent = `Your score is: ${score}`;

    // Play TS 22 song
    const audio = new Audio('img/TS22.mp3');
    audio.play();

    // Functions
    const displayInitialMessagePlus22 = () => {
        presentText.innerHTML = `
            <img class="gif" src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWUwNTJ0emJ0aGcwbWR4aHk4c2t5enFid2Z0b3Fod2I5bndzN3BsaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IwAZ6dvvvaTtdI8SD5/giphy.gif">
            <p>You 're awesome sauce 🎉<br><br>
            As your reward you shall now have my chocolate sauce recipe:</p>
            <button id="recipe1">Show me the recipe</button>
        `;
    };

    const displayInitialMessageMinus22 = () => {
        presentText.innerHTML = `
            <img class="gif" src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3d6ejlzOGFnZDE2ZTZuOGJrY3Njc2JpemFyeGdza3J0ZzB6Y2NtYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hyyV7pnbE0FqLNBAzs/giphy.gif">
            <p>Shit (literally)... I didn't think you would find this... Why would you collect poop u big poop??<br><br>
            You've found the hidden surprise: The name you couldn't come up with...</p>
            <h3>Duhvid</h3>
            <button id="playAgain">Play again</button>
        `;
    };

    const displayFinalMessage = () => {
        presentText.innerHTML = `
            <img class="gif" src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHNzdWZmMDU2cTdhYjllamR5OTl2ZWxqbzYyMjg2cHZlcnh1NjR3aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eKDp7xvUdbCrC/giphy.gif">
            <p>You really thought it was this easy??</p>
            <button id="recipe2">Pretty Please</button>
        `;
    };

    const displayFinalFinalMessage = () => {
        presentText.innerHTML = `
            <img class="gif" src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWt3YXloanRyOGs2dDZnNm93d2hrbThhbWZ3czRzNWE4bnJjajFxOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4LsN0YwgIsvaU/giphy.gif">
            <p>I forgot it's your BD I've gotta be nice today...<br>
            <br>
            Just start warming up some heavy cream and melt dark chocolate into it. You can add random stuff like dutch cocoa powder, Nutella, or sweetener into it. Cook until the consistency is what you want it to be.</p>
            <button id="playAgain">Play again</button>
        `;
    };

    const playAgain = () => {
        window.location.href = 'index.html'; // Redirect to index.html
    };

    // Show the hidden text when the button is clicked
    presentButton.addEventListener('click', () => {
        presentText.classList.toggle('hidden');
        endText.classList.toggle('hidden');

        if (score >= 22) {
            displayInitialMessagePlus22();
            presentText.addEventListener('click', (e) => {
                if (e.target && e.target.id === 'recipe1') {
                    displayFinalMessage();
                }else if (e.target && e.target.id === 'recipe2') {
                    displayFinalFinalMessage();
                } else if (e.target && e.target.id === 'playAgain') {
                    playAgain();
                }
            });
        } else if (score <= -22) {
            displayInitialMessageMinus22();
            presentText.addEventListener('click', (e) => {
                if (e.target && e.target.id === 'playAgain') {
                    playAgain();
                }
            });
        }
    });
});