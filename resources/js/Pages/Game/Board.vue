<template>
    <div>
        <div id="header">
            <div class="text-center mb-4">
                <div id="element-selector" class="flex justify-center space-x-4">
                    <button class="element-btn" data-element="air">💨 Air</button><span>></span>
                    <button class="element-btn" data-element="water">💧 Water</button><span>></span>
                    <button class="element-btn" data-element="fire">🔥 Fire</button><span>></span>
                    <button class="element-btn" data-element="earth">🌍 Earth</button><span>></span>
                    <button class="element-btn" data-element="air">💨 Air</button>
                </div>
            </div>
            <div id="turn-indicator" class="text-center mb-4">Current player: </div>
            <div id="score-board" class="flex justify-center space-x-4 text-center mb-4">
                <div id="black-score">Black: 0</div>
                <button id="random-game-btn" class="cursor-pointer">|</button>
                <div id="white-score">White: 0</div>
            </div>
        </div>
        <div id="game-board" class="my-4" ref="gameBoard"></div>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
    setup() {
        const ELEMENTS = {
            fire: {
                beats: ["earth"],
            },
            water: {
                beats: ["fire"],
            },
            earth: {
                beats: ["air"],
            },
            air: {
                beats: ["water"],
            },
        };

        const gameBoard = ref(null);
        const gameState = ref(null);
        const selectedElement = ref("fire");

        function updateTurnIndicator() {
            gameState.value.turnIndicatorText = `${gameState.value.currentPlayer}'s turn (${gameState.value.selectedElement})`;
        }

        function createBoard() {
            const boardSize = Math.min(
                gameBoard.value.clientWidth,
                gameBoard.value.clientHeight
            );
            gameBoard.value.style.width = `${boardSize}px`;
            gameBoard.value.style.height = `${boardSize}px`;
            gameBoard.value.style.display = "grid";
            gameBoard.value.style.gridTemplateColumns = "repeat(8, 1fr)";
            gameBoard.value.style.gridTemplateRows = "repeat(8, 1fr)";
            gameBoard.value.style.gridGap = "1px";
        }

        function createCells() {
            const cellSize = Math.floor(gameBoard.value.clientWidth / 8) - 1;

            for (let i = 0; i < 64; i++) {
                const cell = document.createElement("div");
                cell.classList.add(
                    "bg-slate-500",
                    "rounded-full",
                    "relative",
                    "cursor-pointer"
                );
                cell.style.width = `${cellSize}px`;
                cell.style.height = `${cellSize}px`;
                cell.style.aspectRatio = "1 / 1";
                cell.dataset.index = i;
                cell.addEventListener("click", handleCellClick);
                gameBoard.value.appendChild(cell);
            }
        }

        function resizeBoard() {
            // Calculate the available height
            const controlsHeight =
                document.getElementById("element-selector").clientHeight;
            const turnIndicatorHeight =
                document.getElementById("turn-indicator").clientHeight;
            const containerPadding = 32; // You have 4 units of padding in the container (4 * 8px) = 32px
            const marginBottom = 16; // You have 2 units of margin-bottom in the turn indicator and element selector (2 * 8px) = 16px

            const availableHeight =
                window.innerHeight -
                controlsHeight -
                turnIndicatorHeight -
                containerPadding -
                marginBottom;

            // Log the values for debugging
            console.log("Window inner height:", window.innerHeight);
            console.log("Controls height:", controlsHeight);
            console.log("Turn indicator height:", turnIndicatorHeight);
            console.log("Container padding:", containerPadding);
            console.log("Margin bottom:", marginBottom);
            console.log("Available height:", availableHeight);

            const boardSize = Math.min(
                window.innerWidth * 0.9,
                availableHeight * 0.9
            );
            gameBoard.value.style.width = `${boardSize}px`;
            gameBoard.value.style.height = `${boardSize}px`;

            const cellSize = Math.floor(boardSize / 9) - 1;
            const cells = gameBoard.value.querySelectorAll("div[data-index]");
            cells.forEach((cell) => {
                cell.style.width = `${cellSize}px`;
                cell.style.height = `${cellSize}px`;
            });
        }

        function initGameState() {
            gameState.value = {
                currentPlayer: "black",
                board: new Array(64).fill(null),
                selectedElement: "fire",
                score: {
                    black: 0,
                    white: 0,
                },
                turnIndicatorText: "black's turn (fire)",
            };
            updateTurnIndicator();
        }

        function changeElement() {
            const newElement =
                document.getElementById("element-selector").value;
            gameState.value.selectedElement = newElement;
        }

        function handleCellClick(event) {
            const index = parseInt(event.target.dataset.index);
            if (gameState.value.board[index] === null) {
                gameState.value.board[index] = {
                    player: gameState.value.currentPlayer,
                    element: gameState.value.selectedElement,
                };
                const svgPath = `/images/${gameState.value.currentPlayer}-${gameState.value.selectedElement}.svg`;
                const img = document.createElement("img");
                img.src = svgPath;
                event.target.appendChild(img);
                checkForCaptures(index);
                gameState.value.currentPlayer =
                    gameState.value.currentPlayer === "black"
                        ? "white"
                        : "black";
                updateTurnIndicator();
            }
        }

        function checkForCaptures(index) {
            const opponent =
                gameState.value.currentPlayer === "black" ? "white" : "black";
            const neighbors = [
                { x: 1, y: 0 },
                { x: -1, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: -1 },
            ];

            const currentPlayerElement =
                ELEMENTS[gameState.value.selectedElement];
            const x = index % 8;
            const y = Math.floor(index / 8);

            neighbors.forEach((neighbor) => {
                const newX = x + neighbor.x;
                const newY = y + neighbor.y;

                if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
                    const neighborIndex = newY * 8 + newX;
                    const neighborCell = gameState.value.board[neighborIndex];

                    if (neighborCell && neighborCell.player === opponent) {
                        const neighborElement = ELEMENTS[neighborCell.element];
                        if (
                            currentPlayerElement.beats.includes(
                                neighborCell.element
                            )
                        ) {
                            gameState.value.board[neighborIndex] = null;
                            gameBoard.value.children[
                                neighborIndex
                            ].style.backgroundColor = "transparent";
                            gameState.value.score[
                                gameState.value.currentPlayer
                            ]++;
                        }
                    }
                }
            });
        }

        onMounted(() => {
            initGameState();
            createBoard();
            createCells();
            resizeBoard();
            window.addEventListener("resize", resizeBoard);
        });

        return {
            gameBoard,
            gameState,
            selectedElement,
            changeElement,
        };
    },
};
</script>

<style scoped>
/* Add your CSS styles */
</style>
