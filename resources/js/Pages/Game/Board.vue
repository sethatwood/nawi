<template>
    <div v-if="gameState">
        <div id="header">
            <div class="text-center mb-4">
                <div
                    id="element-selector"
                    class="flex justify-center items-center space-x-4 mt-3"
                >
                    <button
                        class="element-btn"
                        @click="changeElement('air')"
                        data-element="air"
                    >
                        💨 Air</button
                    ><span>></span>
                    <button
                        class="element-btn"
                        @click="changeElement('water')"
                        data-element="water"
                    >
                        🌊 Water</button
                    ><span>></span>
                    <button
                        class="element-btn selected"
                        @click="changeElement('fire')"
                        data-element="fire"
                    >
                        🔥 Fire
                    </button>
                    <button
                        class="element-btn"
                        @click="changeElement('earth')"
                        data-element="earth"
                    >
                        🌍 Earth</button
                    ><span>></span>
                    <button
                        class="element-btn"
                        @click="changeElement('air')"
                        data-element="air"
                    >
                        💨 Air
                    </button>
                </div>
            </div>
            <div id="turn-indicator" class="text-center mb-4">
                {{ currentPlayerEmoji }} Current player:
                {{ gameState.currentPlayer }}
            </div>
            <div
                id="score-board"
                class="flex justify-center space-x-4 text-center mb-4"
            >
                <div id="black-score">
                    ⚫️ Black: {{ gameState.score.black }}
                </div>
                <button id="random-game-btn" class="cursor-pointer">|</button>
                <div id="white-score">
                    ⚪️ White: {{ gameState.score.white }}
                </div>
            </div>
        </div>
        <div id="board-container" class="my-4" ref="gameBoard"></div>
    </div>
</template>

<script>
import { ref, nextTick, onMounted, reactive, toRefs, computed } from "vue";

export default {
    setup() {
        const ELEMENTS = {
            fire: {
                element: "fire",
                beats: ["earth"],
            },
            water: {
                element: "water",
                beats: ["fire"],
            },
            earth: {
                element: "earth",
                beats: ["air"],
            },
            air: {
                element: "air",
                beats: ["water"],
            },
        };
        const ANIMATION_DURATION = 1000;
        const ADJACENT_OFFSETS = [-1, 1, -9, 9, -8, 8, -7, 7];
        const FLIP_DELAY = 500;

        const gameBoard = ref(null);
        const state = reactive({
            gameState: null,
            selectedElement: "fire",
        });
        const currentPlayerEmoji = computed(() => {
            return state.gameState.currentPlayer === "black" ? "⚫️" : "⚪️";
        });

        function isInBounds(index) {
            return index >= 0 && index < 64;
        }

        function updateTurnIndicator() {
            state.gameState.turnIndicatorText = `${state.gameState.currentPlayer}'s turn (${state.gameState.selectedElement})`;
        }

        async function createBoard() {
            await nextTick();
            const container = document.getElementById("board-container");
            gameBoard.value = container;

            if (container) {
                const boardSize = Math.min(
                    gameBoard.value.clientWidth,
                    gameBoard.value.clientHeight
                );
                gameBoard.value.style.width = `${boardSize}px`;
                gameBoard.value.style.height = `${boardSize}px`;
                gameBoard.value.style.margin = "0 auto";
                gameBoard.value.style.display = "grid";
                gameBoard.value.style.gridTemplateColumns = "repeat(8, 1fr)";
                gameBoard.value.style.gridTemplateRows = "repeat(8, 1fr)";
                gameBoard.value.style.gridGap = "1px";
            } else {
                console.error('Element with id "board-container" not found');
            }
        }

        async function createCells() {
            await nextTick();
            if (!gameBoard.value) {
                console.error("gameBoard.value is null");
                return;
            }
            // const cellSize = Math.floor(gameBoard.value.clientWidth / 8);

            for (let i = 0; i < 64; i++) {
                const cell = document.createElement("div");
                cell.classList.add(
                    "bg-slate-200",
                    "rounded-full",
                    "relative",
                    "cursor-pointer"
                );
                // cell.style.width = `${cellSize}px`;
                // cell.style.height = `${cellSize}px`;
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
            // cells.forEach((cell) => {
            //     cell.style.width = `${cellSize}px`;
            //     cell.style.height = `${cellSize}px`;
            // });
        }

        function initGameState() {
            state.gameState = {
                currentPlayer: "black",
                board: new Array(64).fill(null),
                selectedElement: "fire",
                score: {
                    black: 0,
                    white: 0,
                },
                turnIndicatorText: "black's turn (fire)",
            };
            console.log("Game state initialized");
            logGameState();
        }

        function changeElement(element) {
            // Remove the 'selected' class from all buttons
            document.querySelectorAll(".element-btn").forEach((btn) => {
                btn.classList.remove("selected");
            });

            // Add the 'selected' class to the active element buttons
            document
                .querySelectorAll(`[data-element="${element}"]`)
                .forEach((btn) => {
                    btn.classList.add("selected");
                });

            // Update the selectedElement state
            state.selectedElement = element;
        }

        function doesElementBeat(attacker, defender) {
            console.log("doesElementBeat", attacker, defender);

            const attackingElement = ELEMENTS[attacker];
            const defendingElement = ELEMENTS[defender];

            if (attackingElement && defendingElement) {
                return attackingElement.beats.includes(
                    defendingElement.element
                );
            } else {
                return false;
            }
        }

        async function applyCaptures(index) {
            const cell = state.gameState.board[index];
            const opponent = cell.player === "black" ? "white" : "black";
            const currentPlayerStones = state.gameState.board.filter(
                (stone) =>
                    stone && stone.player === state.gameState.currentPlayer
            );
            const currentElementCount = currentPlayerStones.filter(
                (stone) => stone.element === state.selectedElement
            ).length;

            if (currentElementCount < 16) {
                state.gameState.board[index] = {
                    player: opponent,
                    element: state.selectedElement,
                };

                const cellDiv = gameBoard.value.querySelector(
                    `div[data-index="${index}"]`
                );
                const svgPath = `/images/${opponent}-${state.selectedElement}.svg`;
                const img = document.createElement("img");
                img.src = svgPath;
                console.log("Flipping stone at index:", index);
                await flipStone(cellDiv, img);
            } else {
                console.log(
                    "Not flipping stone at index:",
                    index,
                    " - max element count reached"
                );
            }
        }

        async function cascadeCaptures(index, ignoreIndices = new Set()) {
            console.log("Cascading from index:", index);
            ignoreIndices.add(index); // Add the current index to ignoreIndices
            const adjacentIndices = getAdjacentIndices(index);

            for (const adjIndex of adjacentIndices) {
                if (!ignoreIndices.has(adjIndex)) {
                    // Check if adjIndex is not in ignoreIndices
                    const attacker = state.gameState.board[index];
                    const defender = state.gameState.board[adjIndex];

                    if (defender && attacker.player !== defender.player) {
                        const attackerWins = doesElementBeat(
                            attacker.element,
                            defender.element
                        );
                        if (attackerWins) {
                            console.log("Capture at index:", adjIndex);
                            await applyCaptures(adjIndex);
                            await cascadeCaptures(adjIndex, ignoreIndices); // Pass ignoreIndices to the recursive call
                        }
                    }
                }
            }
        }

        function getAdjacentIndices(index) {
            const row = Math.floor(index / 8);
            const col = index % 8;

            const adjacentIndices = [
                index - 9,
                index - 8,
                index - 7,
                index - 1,
                index + 1,
                index + 7,
                index + 8,
                index + 9,
            ].filter((adjIndex) => {
                const adjRow = Math.floor(adjIndex / 8);
                const adjCol = adjIndex % 8;

                return (
                    adjIndex >= 0 &&
                    adjIndex < 64 &&
                    Math.abs(row - adjRow) <= 1 &&
                    Math.abs(col - adjCol) <= 1
                );
            });

            return adjacentIndices;
        }

        async function handleCellClick(event) {
            console.log("Cell clicked:", event.target.dataset.index);
            logGameState();
            const index = parseInt(event.target.dataset.index);

            if (state.gameState.board[index] === null) {
                state.gameState.board[index] = {
                    player: state.gameState.currentPlayer,
                    element: state.selectedElement,
                };
                const svgPath = `/images/${state.gameState.currentPlayer}-${state.selectedElement}.svg`;
                const img = document.createElement("img");
                img.src = svgPath;
                event.target.appendChild(img);

                // Call cascadeCaptures after placing the stone
                await cascadeCaptures(index, new Set());
            }

            nextTurn(); // Add this line
            console.log("nextTurn() called");
            logGameState();
        }

        async function flipStone(cell, img) {
            return new Promise((resolve) => {
                const oldImg = cell.querySelector("img");

                // Set the position of the images within their cells.
                oldImg.style.position = "absolute";
                img.style.position = "absolute";
                img.style.left = "0";
                img.style.top = "0";

                // Add z-index to the new image so it appears on top of the old image.
                img.style.zIndex = "2";

                oldImg.classList.add("fade-out");
                img.classList.add("fade-in");

                cell.appendChild(img);

                setTimeout(() => {
                    cell.removeChild(oldImg);
                    img.classList.remove("fade-in");
                    // img.style.zIndex = "1"; // Remove this line
                    resolve();
                }, ANIMATION_DURATION);
            });
        }

        function nextTurn() {
            state.gameState.currentPlayer =
                state.gameState.currentPlayer === "black" ? "white" : "black";
            updateTurnIndicator();
        }

        function checkForCaptures(index, element) {
            const opponent =
                state.gameState.currentPlayer === "black" ? "white" : "black";
            const captures = [];
            const currentCell = state.gameState.board[index];

            if (currentCell.player === opponent) {
                return captures;
            }

            // Check all adjacent cells
            for (const offset of ADJACENT_OFFSETS) {
                const newIndex = index + offset;

                if (isInBounds(newIndex)) {
                    const adjacentCell = state.gameState.board[newIndex];

                    if (adjacentCell && adjacentCell.player === opponent) {
                        if (doesElementBeat(element, adjacentCell.element)) {
                            captures.push(newIndex);
                        }
                    }
                }
            }

            return captures;
        }

        function sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }

        function logGameState() {
            console.log("---- Game State ----");
            console.log("Current Player:", state.gameState.currentPlayer);
            console.log("Selected Element:", state.selectedElement);
            console.log("Score:", state.gameState.score);
            console.log("Board:");
            for (let i = 0; i < 8; i++) {
                let row = [];
                for (let j = 0; j < 8; j++) {
                    row.push(state.gameState.board[i * 8 + j]);
                }
                console.log(
                    row
                        .map((cell) =>
                            cell ? `${cell.player[0]}-${cell.element[0]}` : "  "
                        )
                        .join(" ")
                );
            }
            console.log("-------------------");
        }

        onMounted(async () => {
            try {
                initGameState();
                await createBoard();
                await createCells();
                resizeBoard();
                window.addEventListener("resize", resizeBoard);
            } catch (error) {
                console.error("Error in mounted hook:", error);
            }
        });

        return {
            gameBoard,
            ...toRefs(state),
            changeElement,
            currentPlayerEmoji,
        };
    },
};
</script>

<style scoped>
:deep(.selected) {
    background-color: rgba(83, 253, 234, 0.512);
    border: 1px solid rgb(43, 210, 191);
    border-radius: 8px;
    padding: 2px 4px;
}
:deep(.game-board img) {
    transition: opacity 1s;
}

@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes fade-out {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

:deep(.fade-in) {
    animation: fade-in 1s forwards;
}

:deep(.fade-out) {
    animation: fade-out 1s forwards;
}
</style>
