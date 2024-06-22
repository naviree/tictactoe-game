import { io } from "socket.io-client";

const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("reset-button");
const winnerDisplay = document.getElementById("winner");

let currentPlayer = "X";

const player1 = "X";
const player2 = "O";
const winningCombos = [
	[
		[0, 0],
		[0, 1],
		[0, 2],
	],
	[
		[1, 0],
		[1, 1],
		[1, 2],
	],
	[
		[2, 0],
		[2, 1],
		[2, 2],
	],
	[
		[0, 0],
		[1, 0],
		[2, 0],
	],
	[
		[0, 1],
		[1, 1],
		[2, 1],
	],
	[
		[0, 2],
		[1, 2],
		[2, 2],
	],
	[
		[0, 0],
		[1, 1],
		[2, 2],
	],
	[
		[0, 2],
		[1, 1],
		[2, 0],
	],
];

const board = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
];

const socket = io("http://localhost:3000");

socket.emit('custom - event', )

resetButton.addEventListener("click", () => {
	board.forEach((row) => row.fill(0));
	cells.forEach((cell) => (cell.textContent = ""));
	winnerDisplay.textContent = "";
	currentPlayer = "X";
});

function handleClick() {
	cells.forEach((cell, index) => {
		cell.addEventListener("click", (event) => {
			if (cell.textContent === "") {
				cell.textContent = currentPlayer;
				if (currentPlayer === player1) {
					playerTurn(index, currentPlayer);
					currentPlayer = player2;
				} else {
					playerTurn(index, currentPlayer);
					currentPlayer = player1;
				}
			} else {
				console.log(
					"This spot is already occupied. Please choose another spot."
				);
			}
		});
	});
}

function playerTurn(index, currentPlayer) {
	const player = currentPlayer;
	const row = Math.floor(index / 3);
	const column = index % 3;

	board[row][column] = player;
	checkWinner(board);
	if (isTie(board)) {
	}
}

function checkWinner(board) {
	for (let combo of winningCombos) {
		const [[a1, a2], [b1, b2], [c1, c2]] = combo;
		if (
			board[a1][a2] &&
			board[a1][a2] === board[b1][b2] &&
			board[a1][a2] === board[c1][c2]
		) {
			winnerDisplay.textContent = `Player ${board[a1][a2]} wins!`;
		}
	}
	isTie(board);
	return null;
}
function isTie(board) {
	for (let row of board) {
		for (let cell of row) {
			if (cell === 0) {
				return false;
			}
		}
	}
	winnerDisplay.textContent = "It's a tie!";
	return true;
}

handleClick();
