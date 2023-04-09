<script>
export default {
    data() {
        return {
            board: Array(8)
                .fill()
                .map(() => Array(8).fill(null)),
            currentPlayer: "Black",
            players: {
                Black: {
                    element: "air",
                },
                White: {
                    element: "water",
                },
            },
        };
    },
    methods: {
        placePiece(rowIndex, cellIndex) {
            console.log("Clicked cell:", rowIndex, cellIndex);

            // Check if the cell is empty
            if (this.board[rowIndex][cellIndex] === null) {
                // Place the current player's piece on the board
                this.board[rowIndex][cellIndex] = this.currentPlayer;
                console.log(
                    "Placing piece:",
                    this.currentPlayer,
                    this.players[this.currentPlayer].element
                );

                // Switch to the other player
                this.currentPlayer =
                    this.currentPlayer === "Black" ? "White" : "Black";
            }
        },
    },
};
</script>

<template>
    <div>
        <p class="mb-4">
            Current player: {{ currentPlayer }} -
            {{ players[currentPlayer].element }}
        </p>
        <div class="grid grid-cols-8 gap-1">
            <div
                v-for="(row, rowIndex) in board"
                :key="rowIndex"
                class="grid grid-rows-8 gap-1"
            >
                <div
                    v-for="(cell, cellIndex) in row"
                    :key="cellIndex"
                    class="w-16 h-16 border border-gray-300 flex items-center justify-center"
                    @click="placePiece(rowIndex, cellIndex)"
                >
                    <img
                        v-if="cell"
                        :src="`/images/${cell}-${players[cell].element}.svg`"
                        class="w-8 h-8"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
