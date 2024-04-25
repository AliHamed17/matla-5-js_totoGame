let userBalance = 1000;
const lotteryCost = 300;
let gameEnded = false;

document.getElementById('check-button').addEventListener('click', function () {
    if (!gameEnded) {
        checkLottery();
        
    } else {
        alert("ההגרלה הסתיימה , לא יכול להמשיך במשחק");
    }
});

document.getElementById('finish-button').addEventListener('click', function () {
    endGame();
});

function checkLottery() {
    if (!canUserPlay()) {
        alert("You don't have enough money to play the lottery.");
        return;
    }

    let userNumbers = [];
    let selectedNumbers = new Set();
    let isValid = true; 
    document.querySelectorAll('.number-input').forEach(function (input) {
        let number = parseInt(input.value);
        if (number < 1 || number > 37) {
            isValid = false;
            return; 
        }
        if (selectedNumbers.has(number)) {
            isValid = false;
            return;
        }
        selectedNumbers.add(number);
        userNumbers.push(number);
    });

    if (!isValid) {
        alert("Please enter valid and unique numbers between 1 and 37.");
        return;
    }

    let powerNumber = parseInt(document.getElementById('power-number').value);
    if (powerNumber < 1 || powerNumber > 7) {
        alert("Please enter a power number between 1 and 7.");
        return;
    }

    let winningNumbers = generateWinningNumbers();

    let prize = checkResult(winningNumbers, userNumbers, powerNumber);
    updateUserBalance(prize - lotteryCost);

    displayResults(winningNumbers, userNumbers, powerNumber, prize);
}
function resetForm() {
    document.getElementById('power-number').value = ''; // Reset power number input
    document.querySelectorAll('.number-input').forEach(function (input) {
        input.value = ''; 
    });
}

function canUserPlay() {
    return userBalance >= lotteryCost;
}
//לצורך הפשטוט לבדיקת התקינות של המשחק והתנאים של ההגרלה
//מספר החזק שלנו הוא 7
// המספרים האחרים הם 1-6
function generateWinningNumbers() {
    let numbers = [1, 2, 3, 4, 5, 6, 7]; 
    return numbers;
}

function checkResult(winningNumbers, userNumbers, powerNumber) {
    let count = 0;
    for (let num of userNumbers) {
        if (winningNumbers.includes(num)) {
            count++;
        }
    }
    if (count === 6 && winningNumbers[6] === powerNumber) {
        return 1000;
    } else if (count === 6) {
        return 600;
    } else if (count === 4 && winningNumbers[6] === powerNumber) {
        return 400;
    } else {
        return 0;
    }
}

function updateUserBalance(prize) {
    userBalance += prize;
    updateBalanceDisplay(); 
    if (userBalance < lotteryCost) {
        endGame();
    }
}

function updateBalanceDisplay() {
    document.getElementById('user-balance').innerText = userBalance;
}

function displayResults(winningNumbers, userNumbers, powerNumber, prize) {
    let resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
    <h2>Lottery Results</h2>
    <p>Winning Numbers: ${winningNumbers.slice(0, 6).join(', ')}</p>
    <p>Power Number: ${winningNumbers[6]}</p>
    <p>Your Numbers: ${userNumbers.join(', ')}</p>
    <p> Power Number: ${powerNumber}</p>
    <p>Prize: ${prize} Shekels</p>
  `;
    resetForm();
}


function endGame() {
    gameEnded = true;
    alert("The game has ended. Your final balance is: " + userBalance + " Shekels.");
    document.querySelectorAll('.number-input').forEach(function (input) {
        input.disabled = true;
    });
    document.getElementById('check-button').disabled = true;
    document.getElementById('finish-button').disabled = true;
}
