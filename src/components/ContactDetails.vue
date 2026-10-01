<template>
	<header class="text-center">
		<h1 class="text-4xl font-bold text-gray-900">Gustavo Peralta Vázquez</h1>
		<p class="mt-1 text-lg text-gray-600">
			{{ cv.title }}
			<a id="language-link" class="cursor-pointer text-gray-400" @click="$emit('change-lang')">({{ locale.toUpperCase() }})</a>
		</p>
		<p class="mt-2 text-sm text-gray-700">
			<a href="mailto:gussrw1@gmail.com">gussrw1@gmail.com</a>
			<span class="mx-2">|</span>
			<a href="https://github.com/GussRw">github.com/gussrw</a>
			<span class="mx-2">|</span>
			<a href="https://www.linkedin.com/in/gussrw">linkedin.com/in/gussrw</a>
			<span class="mx-2">|</span>
			<metric-text :text="cv.location" />
		</p>
		<p class="mt-3 text-gray-800"><metric-text :text="cv.summary" /></p>
	</header>
</template>
<script setup>
import MetricText from "@/components/MetricText.vue";

defineProps({
    cv: {type: Object, required: true},
    locale: {type: String, required: true},
});
defineEmits(['change-lang']);
</script>
