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
        const selectedElement = ref("fire");
        const state = reactive({
            gameState: null,
            selectedElement: "fire",
        });
        const currentPlayerEmoji = computed(() => {
            return state.gameState.currentPlayer === "black" ? "⚫️" : "⚪️";
        });

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

        function handleCellClick(event) {
            const index = parseInt(event.target.dataset.index);
            if (state.gameState.board[index] === null) {
                state.gameState.board[index] = {
                    player: state.gameState.currentPlayer,
                    element: state.gameState.selectedElement,
                };
                // Use the selectedElement in the SVG path
                const svgPath = `/images/${state.gameState.currentPlayer}-${state.selectedElement}.svg`;
                const img = document.createElement("img");
                img.src = svgPath;
                event.target.appendChild(img);
                checkForCaptures(index);
                state.gameState.currentPlayer =
                    state.gameState.currentPlayer === "black"
                        ? "white"
                        : "black";
                updateTurnIndicator();
            }
        }

        function checkForCaptures(index) {
            const opponent =
                state.gameState.currentPlayer === "black" ? "white" : "black";
            const neighbors = [
                { x: 1, y: 0 },
                { x: -1, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: -1 },
            ];

            const currentPlayerElement =
                ELEMENTS[state.gameState.selectedElement];
            const x = index % 8;
            const y = Math.floor(index / 8);

            neighbors.forEach((neighbor) => {
                const newX = x + neighbor.x;
                const newY = y + neighbor.y;

                if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
                    const neighborIndex = newY * 8 + newX;
                    const neighborCell = state.gameState.board[neighborIndex];

                    if (neighborCell && neighborCell.player === opponent) {
                        const neighborElement = ELEMENTS[neighborCell.element];
                        if (
                            currentPlayerElement.beats.includes(
                                neighborElement.element
                            )
                        ) {
                            state.gameState.board[neighborIndex] = {
                                player: state.gameState.currentPlayer,
                                element: state.gameState.selectedElement,
                            };
                            const svgPath = `/images/${state.gameState.currentPlayer}-${state.selectedElement}.svg`;
                            const img = document.createElement("img");
                            img.src = svgPath;
                            gameBoard.value.children[neighborIndex].innerHTML =
                                "";
                            gameBoard.value.children[neighborIndex].appendChild(
                                img
                            );
                        }
                    }
                }
            });

            // Update the score based on the number of pieces on the board
            state.gameState.score.black = state.gameState.board.filter(
                (cell) => cell && cell.player === "black"
            ).length;
            state.gameState.score.white = state.gameState.board.filter(
                (cell) => cell && cell.player === "white"
            ).length;
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
</style>
