<template>
	<span>
		<template v-for="(part, i) in parts" :key="i">
			<b v-if="part.bold" class="font-semibold text-gray-900">{{ part.text }}</b>
			<mark v-else-if="part.placeholder" class="bg-yellow-100 text-yellow-900 rounded px-0.5">{{ part.text }}</mark>
			<template v-else>{{ part.text }}</template>
		</template>
	</span>
</template>
<script setup>
import {computed} from "vue";

const props = defineProps({
    text: {type: String, required: true},
});

// Renders **bold** highlights and marks the [metric: ...] placeholders that still need real numbers
const parts = computed(() => props.text
    .split(/(\*\*[^*]+\*\*|\[[^\]]+\])/)
    .filter(text => text !== '')
    .map(text => text.startsWith('**')
        ? {text: text.slice(2, -2), bold: true}
        : {text, placeholder: text.startsWith('[')}));
</script>
