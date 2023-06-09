<template>
 <div class="container mx-auto px-4">
  <div v-if="gameState">
   <div id="header">
    <div class="text-center mb-4">
     <div
      id="element-selector"
      class="flex justify-center items-center space-x-4 mt-3"
     >
      <template
       v-for="(element, index) in elementsForLoop"
       :key="element.element"
      >
       <button
        class="element-btn"
        :class="{ selected: selectedElement === element.element }"
        @click="changeElement(element.element)"
        :data-element="element.element"
       >
        <img
         :src="'/images/' + element.element + '-icon.png'"
         width="42"
         class="mb-2"
        />
        <span>
         {{ elementCounts("white", element.element) }} ⚪️ • ⚫️
         {{ elementCounts("black", element.element) }}
        </span>
       </button>
       <span v-if="index < elementsForLoop.length - 1" style="font-size: 2rem">
        >
       </span>
      </template>
     </div>
    </div>
    <div
     id="score-board"
     class="flex justify-center space-x-4 text-center mb-4"
    >
     <div>{{ currentPlayerTurnString }}</div>
     <div>•</div>
     <div id="white-score">{{ gameState.score.white }} ⚪️</div>
     <button id="random-game-btn" class="cursor-pointer">•</button>
     <div id="black-score">⚫️ {{ gameState.score.black }}</div>
    </div>
   </div>
   <div v-if="!gameStarted">
    <div class="text-center mb-4 space-x-4">
     <span>Board size: </span>
     <template v-for="size in [6, 8, 12]">
      <input
       type="radio"
       :id="'size' + size + 'x' + size"
       :value="size"
       v-model="boardSize"
       @change="updateBoardSize"
      />
      <label :for="'size' + size + 'x' + size">{{ size }}x{{ size }}</label>
     </template>
    </div>
   </div>
   <div id="board-container" class="my-4" ref="gameBoard"></div>
  </div>
  <div id="welcome" class="mx-auto w-full max-w-2xl my-24">
   <h1 class="text-4xl font-bold text-center mb-6">
    <strong>nawi</strong> 🌪️ 🌊 🔥 🌍
   </h1>
   <Rules />
   <Footer />
  </div>
 </div>
</template>

<script>
import Rules from "@/Components/Rules.vue";
import Footer from "@/Components/Footer.vue";
import { logGameState } from "@/Helpers/Helpers.js";
import { ref, nextTick, onMounted, reactive, toRefs, computed } from "vue";

export default {
 setup() {
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
   boardSize: 8,
   gameStarted: false,
  });
  const currentPlayerEmoji = computed(() => {
   return state.gameState.currentPlayer === "black" ? "⚫️" : "⚪️";
  });
  const pulsingPieces = ref([]);
  const hasPulsingPieces = computed(() => pulsingPieces.value.length > 0);
  const addPulseClass = (cell) => {
   cell.classList.add("pulse");
   pulsingPieces.value.push(cell);
   console.log("addPulseClass", pulsingPieces.value);
  };
  const currentPlayer = computed(() => {
   if (hasPulsingPieces.value) {
    return pulsingPieces.value[0].dataset.player;
   } else {
    return turns.value % 2 === 0 ? "X" : "O";
   }
  });

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
    gameBoard.value.style.gridTemplateColumns = `repeat(${state.boardSize}, 1fr)`;
    gameBoard.value.style.gridTemplateRows = `repeat(${state.boardSize}, 1fr)`;
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
   for (let i = 0; i < state.boardSize * state.boardSize; i++) {
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
   const containerPadding = 32;
   const marginBottom = 16;
   const availableHeight =
    window.innerHeight - controlsHeight - containerPadding - marginBottom;
   const boardSize = Math.min(window.innerWidth * 0.9, availableHeight * 0.9);
   const cellSize = boardSize / state.boardSize;
   gameBoard.value.style.width = `${boardSize}px`;
   gameBoard.value.style.height = `${boardSize}px`;

   const cells = gameBoard.value.querySelectorAll(".bg-slate-200");
   cells.forEach((cell) => {
    cell.style.width = `${cellSize}px`;
    cell.style.height = `${cellSize}px`;
   });
  }

  function clearBoard() {
   if (!gameBoard.value) {
    console.error("gameBoard.value is null");
    return;
   }
   while (gameBoard.value.firstChild) {
    gameBoard.value.firstChild.remove();
   }
  }

  function updateBoardSize() {
   clearBoard();
   createBoard();
   createCells();
   initGameState();
   resizeBoard();
  }

  const elementsForLoop = computed(() => {
   const elementsArray = Object.values(ELEMENTS);
   elementsArray.splice(4, 0, elementsArray[0]);
   return elementsArray;
  });

  function changeElement(element) {
   document.querySelectorAll(".element-btn").forEach((btn) => {
    btn.classList.remove("selected");
   });
   document.querySelectorAll(`[data-element="${element}"]`).forEach((btn) => {
    btn.classList.add("selected");
   });
   state.selectedElement = element;
  }

  function currentPlayerElementCount(element) {
   return state.gameState.elementCounts[state.gameState.currentPlayer][element];
  }

  const currentPlayerTurnString = computed(() => {
   const symbol = state.gameState.currentPlayer === "black" ? "⚫️" : "⚪️";
   const name =
    state.gameState.currentPlayer.charAt(0).toUpperCase() +
    state.gameState.currentPlayer.slice(1);
   if (hasPulsingPieces.value) {
    console.log("hasPulsingPieces", hasPulsingPieces.value);
    return `Waiting for ${name}`;
   }
   return `${symbol} ${name} to Play (${
    state.selectedElement.charAt(0).toUpperCase() +
    state.selectedElement.slice(1)
   })`;
  });

  function initGameState() {
   const totalCells = state.boardSize * state.boardSize;
   const elementsPerPlayer = Math.floor(totalCells / 4);

   state.gameState = {
    currentPlayer: "black",
    board: new Array(totalCells).fill(null),
    selectedElement: "fire",
    score: {
     black: 0,
     white: 0,
    },
    elementCounts: {
     black: {
      air: elementsPerPlayer,
      water: elementsPerPlayer,
      fire: elementsPerPlayer,
      earth: elementsPerPlayer,
     },
     white: {
      air: elementsPerPlayer,
      water: elementsPerPlayer,
      fire: elementsPerPlayer,
      earth: elementsPerPlayer,
     },
    },
    turnIndicatorText: "black's turn (fire)",
   };
   console.log("Game state initialized");
   logGameState("initGameState", state, currentPlayerEmoji);
  }

  async function handleCellClick(event) {
   // logGameState("handleCellClick start", state, currentPlayerEmoji);
   let targetElement = event.target;
   console.log("Event target class list:", targetElement.classList);
   console.log("Cell clicked:", targetElement.dataset.index);
   const index = parseInt(targetElement.dataset.index);
   if (targetElement.tagName.toLowerCase() === "img") {
    targetElement = targetElement.parentElement;
   }
   if (
    state.gameState.board[index] !== null &&
    !targetElement.classList.contains("pulse")
   ) {
    console.log("Cell already occupied");
    alert("This cell is already occupied. Please select an empty cell.");
    return;
   }
   if (currentPlayerElementCount(state.selectedElement) === 0) {
    console.log(`No more ${state.selectedElement} elements left`);
    alert(
     `You have no more ${state.selectedElement} elements left. Please choose a different element.`
    );
    return;
   }
   if (targetElement.classList.contains("pulse")) {
    console.log("Cell is pulsing");
    const index = parseInt(targetElement.dataset.index);
    const threateningIndex = findThreateningPieceIndex(index);
    console.log("Threatening piece index:", threateningIndex);
    if (threateningIndex !== -1) {
     state.gameState.board[index] = state.gameState.board[threateningIndex];
     targetElement.innerHTML = "";
     const svgPath = `/images/${state.gameState.board[threateningIndex].player}-${state.gameState.board[threateningIndex].element}.svg`;
     const img = document.createElement("img");
     img.src = svgPath;
     targetElement.appendChild(img);
     targetElement.classList.remove("pulse");
     pulsingPieces.value = pulsingPieces.value.filter(
      (cell) => cell !== targetElement
     );
    }
    identifyThreatenedPieces();
    if (!checkForPulsingPieces()) {
     console.log("No more pulsing pieces, calling nextTurn()");
     nextTurn();
    }
    return;
   }
   state.gameState.board[index] = {
    player: state.gameState.currentPlayer,
    element: state.selectedElement,
   };
   state.gameState.elementCounts[state.gameState.currentPlayer][
    state.selectedElement
   ]--;
   const svgPath = `/images/${state.gameState.currentPlayer}-${state.selectedElement}.svg`;
   const img = document.createElement("img");
   img.src = svgPath;
   targetElement.appendChild(img);
   targetElement.classList.add("cell-occupied");
   state.gameState.score.black = state.gameState.board.filter(
    (cell) => cell && cell.player === "black"
   ).length;
   state.gameState.score.white = state.gameState.board.filter(
    (cell) => cell && cell.player === "white"
   ).length;
   if (!state.gameStarted) {
    console.log("Game started");
    state.gameStarted = true;
   }
   identifyThreatenedPieces();
   logGameState(
    "handleCellClick after identifyThreatenedPieces()",
    state,
    currentPlayerEmoji
   );
   const checkForPulsingPiecesResult = checkForPulsingPieces();
   console.log("checkForPulsingPiecesResult:", checkForPulsingPiecesResult);
   if (!checkForPulsingPiecesResult) {
    console.log("No pulsing pieces, calling nextTurn()");
    nextTurn();
   } else {
    console.log("There are pulsing pieces");
    state.gameState.turnIndicatorText = `Waiting for ${
     state.gameState.currentPlayer.charAt(0).toUpperCase() +
     state.gameState.currentPlayer.slice(1)
    }`;
   }
  }

  function checkForPulsingPieces() {
   const pulsingPieces = gameBoard.value.querySelectorAll(".pulse[data-index]");
   console.log("pulsingPieces:", pulsingPieces);
   return pulsingPieces.length > 0;
  }

  function identifyThreatenedPieces() {
   const directions = [
    { row: -1, col: 0 },
    { row: 0, col: 1 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
   ];
   gameBoard.value.querySelectorAll(".pulse").forEach((cell) => {
    cell.classList.remove("pulse");
   });
   if (pulsingPieces.value.length > 0) {
    pulsingPieces.value = [];
   }
   for (let index = 0; index < state.boardSize * state.boardSize; index++) {
    const row = Math.floor(index / state.boardSize);
    const col = index % state.boardSize;
    const currentCell = state.gameState.board[index];
    if (!currentCell) continue;
    for (const direction of directions) {
     const newRow = row + direction.row;
     const newCol = col + direction.col;
     if (
      newRow >= 0 &&
      newRow < state.boardSize &&
      newCol >= 0 &&
      newCol < state.boardSize
     ) {
      const adjacentIndex = newRow * state.boardSize + newCol;
      const adjacentCell = state.gameState.board[adjacentIndex];
      if (
       adjacentCell &&
       currentCell.player !== adjacentCell.player &&
       ELEMENTS[adjacentCell.element].beats.includes(currentCell.element)
      ) {
       const cellElement = gameBoard.value.querySelector(
        `[data-index="${index}"]`
       );
       cellElement.classList.add("pulse");
       pulsingPieces.value.push(cellElement);
      }
     }
    }
   }
  }

  function findThreateningPieceIndex(index) {
   const row = Math.floor(index / state.boardSize);
   const col = index % state.boardSize;
   const currentCell = state.gameState.board[index];
   const directions = [
    { row: -1, col: 0 },
    { row: 0, col: 1 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
   ];
   for (const direction of directions) {
    const newRow = row + direction.row;
    const newCol = col + direction.col;
    if (
     newRow >= 0 &&
     newRow < state.boardSize &&
     newCol >= 0 &&
     newCol < state.boardSize
    ) {
     const adjacentIndex = newRow * state.boardSize + newCol;
     const adjacentCell = state.gameState.board[adjacentIndex];
     if (
      adjacentCell &&
      currentCell.player !== adjacentCell.player &&
      ELEMENTS[adjacentCell.element].beats.includes(currentCell.element)
     ) {
      return adjacentIndex;
     }
    }
   }
   return -1;
  }

  function nextTurn() {
   if (!checkForPulsingPieces()) {
    state.gameState.currentPlayer =
     state.gameState.currentPlayer === "black" ? "white" : "black";
    console.log("current player is now: ", state.gameState.currentPlayer);
   }
   state.gameState.turnIndicatorText = `${state.gameState.currentPlayer}'s turn (${state.gameState.selectedElement})`;
  }

  function elementCounts(player, element) {
   return state.gameState.elementCounts[player][element];
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
   currentPlayerTurnString,
   ELEMENTS,
   elementCounts,
   elementsForLoop,
   gameBoard,
   ...toRefs(state),
   changeElement,
   currentPlayerEmoji,
   currentPlayerElementCount,
   updateBoardSize,
   pulsingPieces,
   addPulseClass,
   hasPulsingPieces,
   currentPlayer,
   Rules,
   Footer,
  };
 },
};
</script>

<style>
body {
 background-color: #1e1e1e;
 color: #fff;
}
</style>

<style scoped>
:deep(.element-btn) {
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
}
:deep(.element-count) {
 display: inline-block;
 background-color: rgba(83, 253, 234, 0.512);
 border-radius: 4px;
 padding: 2px 4px;
 margin-left: 4px;
 font-weight: bold;
}
:deep(.game-board img) {
 transition: opacity 1s;
}
:deep(.selected) {
 background-color: rgba(83, 253, 234, 0.1);
 border: 1px solid rgb(43, 210, 191);
 border-radius: 8px;
 padding: 2px 4px;
}
:deep(.cell-occupied) {
 cursor: not-allowed;
}
:deep(.fade-in) {
 animation: fade-in 1s forwards;
}
:deep(.fade-out) {
 animation: fade-out 1s forwards;
}
:deep(.pulse) {
 animation: pulse 3s infinite;
}
@keyframes pulse {
 0% {
  transform: scale(1);
  opacity: 1;
  cursor: grabbing;
 }
 25% {
  transform: scale(0.8);
  opacity: 0.618;
  cursor: grab;
 }
 100% {
  transform: scale(1);
  opacity: 1;
  cursor: grabbing;
 }
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
