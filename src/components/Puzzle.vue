<template>
    <div class="flex flex-col justify-center items-center">
        <div :id="puzzleId" class="border rounded-md p-2 inline-flex flex-col gap-2">
            <div class="flex-none flex items-center gap-2">
                <div class="flex-none">
                    <DefaultButton @click="reset()" label="New"/>
                </div>
                <div class="flex-none">
                    <DefaultButton @click="solved()" label="Solved"/>
                </div>
                <div class="flex-1"></div>
                <div class="flex-none text-gray-500">Moves: {{ movesCount }}</div>
            </div>
            <div class="flex-1">
                <transition-group name="cell" tag="div" type="transition" class="grid gap-4"
                                  style="margin: 0 auto; max-width: 100%;max-height: 100%;"
                                  :style="` grid-template-columns: repeat(${gridSize}, minmax(0, 1fr)); grid-template-rows: repeat(${gridSize}, minmax(0, 1fr)); width: ${gridSize * 100}px; height: ${gridSize * 100}px;`">
                    <div @click="onCellClick(cell, cellIndex)" v-for="(cell, cellIndex) in gridItems"
                         class="cell-item rounded-md inline-flex justify-center items-center select-none font-bold text-gray-500 cursor-default flex-none"
                         :style="`fontSize: ${Math.max(100 / gridSize, 24)}px;`"
                         :class="{
                'bg-white cell-target': cell === -1,
                'bg-gray-200 border-1 border-gray-500': cell >-1
            }"
                         :key="cell">
                        {{ cell > -1 ? cell : '' }}
                    </div>
                </transition-group>
            </div>
        </div>
        <div v-if="isSolved"
             class="bg-[#FFD700] text-[20px] w-full p-2 mt-[16px] rounded-[6px] text-center font-semibold select-none text-white">
            Congrats, you solved the puzzle
        </div>
    </div>
</template>

<script setup>
import PuzzleCore from "../utils/PuzzleCore.js";
import {computed, ref, onMounted, watch, nextTick} from "vue";
import anime from 'animejs'

const props = defineProps({
    size: {
        type: Number,
        default: 16
    }
})

const puzzle = ref(null)
const movesCount = computed(() => puzzle.value?.moves || 0)
const isSolved = computed(() => puzzle.value?.isSolved || false)
const gridItems = computed(() => puzzle.value?.cells || [])
const gridSize = ref(0)
const puzzleId = ref('')

onMounted(() => {
    puzzle.value = new PuzzleCore({size: props.size})
    gridSize.value = puzzle.value.getSize
    puzzleId.value = puzzle.value.id
})

function reset() {
    puzzle.value.reset()
}

function solved() {
    puzzle.value.solved()
}

function onCellClick(cell, index) {
    if (isSolved.value) return
    puzzle.value.move(cell, index)
}

watch(isSolved, () => {
    console.log('isSolved', isSolved.value)
    if (isSolved.value) {
        nextTick(() => {
            setTimeout(() => {
                anime({
                    targets: `#${puzzleId.value} .cell-item`,
                    scale: [
                        {value: .9, easing: 'easeOutSine', duration: 200},
                        {value: 1, easing: 'easeInSine', duration: 400}
                    ],
                    delay: anime.stagger(200, {grid: [gridSize.value, gridSize.value], from: 'center'})
                });
            }, 1000)
        })
    }
})
</script>