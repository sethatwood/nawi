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
                        <img src="/images/air-icon.png" width="48" /></button
                    ><span style="font-size: 2rem">></span>
                    <button
                        class="element-btn"
                        @click="changeElement('water')"
                        data-element="water"
                    >
                        <img src="/images/water-icon.png" width="48" /></button
                    ><span style="font-size: 2rem">></span>
                    <button
                        class="element-btn selected"
                        @click="changeElement('fire')"
                        data-element="fire"
                    >
                        <img src="/images/fire-icon.png" width="48" /></button
                    ><span style="font-size: 2rem">></span>
                    <button
                        class="element-btn"
                        @click="changeElement('earth')"
                        data-element="earth"
                    >
                        <img src="/images/earth-icon.png" width="48" /></button
                    ><span style="font-size: 2rem">></span>
                    <button
                        class="element-btn"
                        @click="changeElement('air')"
                        data-element="air"
                    >
                        <img src="/images/air-icon.png" width="48" />
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
        // CONSTANTS
        const ELEMENTS = {
            air: {
                element: "air",
                beats: ["water"],
            },
            water: {
                element: "water",
                beats: ["fire"],
            },
            fire: {
                element: "fire",
                beats: ["earth"],
            },
            earth: {
                element: "earth",
                beats: ["air"],
            },
        };
        const gameBoard = ref(null);
        const state = reactive({
            gameState: null,
            selectedElement: "fire",
        });
        const currentPlayerEmoji = computed(() => {
            return state.gameState.currentPlayer === "black" ? "⚫️" : "⚪️";
        });

        // BOARD RENDERING AND RESIZING
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
            for (let i = 0; i < 64; i++) {
                const cell = document.createElement("div");
                cell.classList.add(
                    "bg-slate-200",
                    "rounded-full",
                    "relative",
                    "cursor-pointer"
                );
                cell.style.aspectRatio = "1 / 1";
                cell.dataset.index = i;
                cell.addEventListener("click", handleCellClick);
                gameBoard.value.appendChild(cell);
            }
        }

        function resizeBoard() {
            const controlsHeight =
                document.getElementById("element-selector").clientHeight;
            const turnIndicatorHeight =
                document.getElementById("turn-indicator").clientHeight;
            const containerPadding = 32;
            const marginBottom = 16;
            const availableHeight =
                window.innerHeight -
                controlsHeight -
                turnIndicatorHeight -
                containerPadding -
                marginBottom;
            const boardSize = Math.min(
                window.innerWidth * 0.9,
                availableHeight * 0.9
            );
            gameBoard.value.style.width = `${boardSize}px`;
            gameBoard.value.style.height = `${boardSize}px`;
        }

        // ELEMENT SELECTORS
        function changeElement(element) {
            document.querySelectorAll(".element-btn").forEach((btn) => {
                btn.classList.remove("selected");
            });
            document
                .querySelectorAll(`[data-element="${element}"]`)
                .forEach((btn) => {
                    btn.classList.add("selected");
                });
            state.selectedElement = element;
        }

        // GAME LOGIC
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
                    `r${i + 1} |` +
                        row
                            .map((cell, index) =>
                                cell
                                    ? ` c${index + 1}•${cell.player[0]}${
                                          cell.element[0]
                                      } |`
                                    : ` c${index + 1}    |`
                            )
                            .join("")
                );
            }
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
            }

            state.gameState.score.black = state.gameState.board.filter(
                (cell) => cell && cell.player === "black"
            ).length;
            state.gameState.score.white = state.gameState.board.filter(
                (cell) => cell && cell.player === "white"
            ).length;

            nextTurn();
            console.log("nextTurn() called");
            logGameState();
        }

        function nextTurn() {
            state.gameState.currentPlayer =
                state.gameState.currentPlayer === "black" ? "white" : "black";
            state.gameState.turnIndicatorText = `${state.gameState.currentPlayer}'s turn (${state.gameState.selectedElement})`;
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
:deep(.game-board img) {
    transition: opacity 1s;
}
:deep(.selected) {
    background-color: rgba(83, 253, 234, 0.512);
    border: 1px solid rgb(43, 210, 191);
    border-radius: 8px;
    padding: 2px 4px;
}
:deep(.fade-in) {
    animation: fade-in 1s forwards;
}
:deep(.fade-out) {
    animation: fade-out 1s forwards;
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
</style>
