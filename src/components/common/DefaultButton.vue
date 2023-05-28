<template>
    <button type="button"
            v-bind="$attrs"
            class="h-[40px] px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 ">
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