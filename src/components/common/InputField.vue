<template>
    <input :type="type"
           :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           class="h-[40px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5"
    />
</template>

<script setup>
defineProps({
    type: {
        type: String,
        default: 'text'
    },
    modelValue: [String, Number]
})
</script>

<style scoped>

</style>