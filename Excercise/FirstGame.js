const isBrowser = typeof window !== "undefined" && typeof window.confirm === "function";
const isNode = typeof process !== "undefined" && process.stdin && process.stdout;

let nodeInterface = null;

function getNodeInterface() {
    if (!nodeInterface) {
        const readline = require("readline");
        nodeInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }
    return nodeInterface;
}

function closeNodeInterface() {
    if (nodeInterface) {
        nodeInterface.close();
        nodeInterface = null;
    }
}

function nodeQuestion(message) {
    const rl = getNodeInterface();
    return new Promise((resolve) => {
        rl.question(message, (answer) => resolve(answer));
    });
}

async function ask(message) {
    if (isBrowser) {
        return prompt(message);
    }
    if (isNode) {
        return await nodeQuestion(`${message} `);
    }
    return "";
}

async function askConfirm(message) {
    if (isBrowser) {
        return confirm(message);
    }
    if (isNode) {
        const answer = await nodeQuestion(`${message} (y/n) `);
        return /^y(es)?$/i.test(String(answer).trim());
    }
    return false;
}

function say(message) {
    if (isBrowser) {
        alert(message);
    } else {
        console.log(message);
    }
}

function normalizeChoice(choice) {
    return choice.trim().toLowerCase();
}

function isValidChoice(choice) {
    return choice === "paper" || choice === "scissors" || choice === "rock";
}

function getComputerChoice() {
    const roll = Math.floor(Math.random() * 3);
    return roll === 0 ? "rock" : roll === 1 ? "paper" : "scissors";
}

function getResult(playerOne, computer) {
    if (playerOne === computer) {
        return `Player: ${playerOne}\nComputer: ${computer}\nTie game!`;
    }

    const computerWins =
        (playerOne === "rock" && computer === "paper") ||
        (playerOne === "paper" && computer === "scissors") ||
        (playerOne === "scissors" && computer === "rock");

    return computerWins
        ? `Player: ${playerOne}\nComputer: ${computer}\nComputer wins!`
        : `Player: ${playerOne}\nComputer: ${computer}\nPlayer wins!`;
}

async function runGame() {
    try {
        const playGame = await askConfirm("Shall we play a game?");
        if (!playGame) {
            say("Ok, maybe next time.");
            return;
        }

        while (true) {
            const playerChoice = await ask("Enter: paper, scissors, or rock");
            if (!playerChoice || !playerChoice.trim()) {
                say("I guess you changed your mind. Maybe next time.");
                break;
            }

            const playerOne = normalizeChoice(playerChoice);
            if (!isValidChoice(playerOne)) {
                say("You didn't enter rock, paper, or scissors.");
                break;
            }

            const computer = getComputerChoice();
            say(getResult(playerOne, computer));

            const playAgain = await askConfirm("Play Again?");
            if (!playAgain) {
                say("Ok, thanks for playing.");
                break;
            }
        }
    } finally {
        if (isNode) {
            closeNodeInterface();
        }
    }
}

runGame();