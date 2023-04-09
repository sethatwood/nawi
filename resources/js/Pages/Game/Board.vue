<template>
    <div class="game-board">
      <div class="grid grid-cols-8 gap-1">
        <div
          v-for="row in 8"
          :key="'row-' + row"
          class="game-row"
        >
          <div
            v-for="col in 8"
            :key="`cell-${row}-${col}`"
            class="game-cell"
          >
            <!-- Element components will be placed here -->
          </div>
        </div>
      </div>
    </div>
</template>
