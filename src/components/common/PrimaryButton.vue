<template>
    <button type="button"
            v-bind="$attrs"
            class="h-[40px] text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 ">
        {{ label }}
    </button>
</template>

<script setup>
defineProps({
    label: String,
})
</script>

<style scoped>

</style>