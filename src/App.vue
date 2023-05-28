<script setup>
import Puzzle from "./components/Puzzle.vue";
import {ref} from "vue";

const cellCount = ref(16)
const puzzles = ref([
    {
        size: 9
    }
])
const AddPuzzle = () => {
    puzzles.value.push({
        size: cellCount.value
    })
}
</script>

<template>
    <header class="bg-gray-100 p-4">
        <div class="w-[400px]">
            <form-control label="New Puzzle">
                <div class="flex gap-2 items-center">
                    <InputField type="Number" v-model.number="cellCount"/>
                    <PrimaryButton @click="AddPuzzle" label="Add"/>
                </div>
            </form-control>
        </div>
    </header>
    <section>
        <div class="flex flex-wrap justify-center items-start p-10 gap-20">
                <Puzzle v-for="(puzzle , i) in puzzles" :key="i" :size="puzzle.size"/>
        </div>
    </section>
</template>

<style scoped>
</style>
