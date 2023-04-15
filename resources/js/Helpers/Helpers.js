export function logGameState(context, state, currentPlayerEmoji) {
 console.log("logGameState() called from:", context || "unknown");
 console.log(
  "%c✧･ﾟ: *✧･ﾟ:* 🔥💧🌪🌎 ⚫⚪ 🎉😄 %cGAME STATE%c 😄🎉 ⚪⚫ 🌎🌪💧🔥 *:･ﾟ✧*:･ﾟ✧",
  "font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 1.4em;",
  "font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 1.4em;",
  "font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 1.4em;"
 );
 console.log(
  "%cRaw State Object:",
  "background: #FFC107; color: #212121; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 16px;",
  state
 );
 console.log(
  "%cRaw GameState Object:",
  "background: #4CAF50; color: #FFFFFF; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 16px;",
  state.gameState
 );
 console.log(
  "%cBoard Size:",
  "background: #2196F3; color: #FFFFFF; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 16px;",
  state.boardSize
 );
 console.log(
  "%cCurrent Player:",
  "background: #9C27B0; color: #FFFFFF; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 16px;",
  state.gameState.currentPlayer
 );
 console.log(
  "%cCurrent Player Emoji:",
  "background: #f44336; color: #FFFFFF; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 16px;",
  currentPlayerEmoji.value
 );
 console.log(
  "%cSelected Element:",
  "background: #3F51B5; color: #FFFFFF; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 16px;",
  state.selectedElement
 );
 console.log(
  "%cScore (Black, White):",
  "background: #009688; color: #FFFFFF; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 16px;",
  state.gameState.score.black,
  state.gameState.score.white
 );
 console.log(
  "%cCurrent Player's Element Counts:",
  "background: #E91E63; color: #FFFFFF; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 16px;",
  state.gameState.elementCounts[state.gameState.currentPlayer]
 );
 console.log(
  "%cPulsing Pieces:",
  "background: #00BCD4; color: #212121; font-family: 'Comic Sans MS', cursive, sans-serif; font-size: 16px;",
  state.pulsingPieces
   ? state.pulsingPieces.map((cell) => cell.dataset.index).join(", ")
   : ""
 );

 console.log("Board:");
 for (let i = 0; i < state.boardSize; i++) {
  let row = [];
  for (let j = 0; j < state.boardSize; j++) {
   row.push(state.gameState.board[i * state.boardSize + j]);
  }
  console.log(
   `r${i + 1} |` +
   row
    .map((cell, index) =>
     cell
      ? ` c${index + 1}•${cell.player[0]}${cell.element[0]} |`
      : ` c${index + 1}    |`
    )
    .join("")
  );
 }
}
