<template>
    <div class="form-control" style="width: 100%">
        <div class="flex items-center gap-2">
            <div class="flex-none" v-bind="labelStyle">
                <label class="text-[18px] text-semibold">
                    {{ label }}
                </label>
            </div>
            <div class="flex-1">
                <slot/>
            </div>
        </div>
    </div>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
    label: String,
    labelShrink: {
        type: Boolean,
        default: true
    },
    labelWidth: {
        type: String,
        default: '90px'
    },
    labelSize: {
        type: String
    }
})

const labelStyle = computed(() => {
    return {
        flex: props.labelShrink ? props.labelWidth : "100%"
    }
})
</script>