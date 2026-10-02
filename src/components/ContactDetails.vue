<template>
	<header class="text-center">
		<h1 class="text-4xl font-bold text-gray-900"><a :href="cv.siteUrl">Gustavo Peralta</a></h1>
		<p class="mt-1 text-lg text-gray-600">{{ cv.title }}</p>
		<p class="text-sm print:hidden">
			<a id="language-link" :href="links.language" class="text-blue-600 underline hover:text-blue-800" @click.prevent="$emit('navigate', links.language)">{{ cv.switchLanguage }}</a>
			<span class="mx-2 text-gray-400">·</span>
			<a :href="`/${cv.pdf.file}`" download class="text-blue-600 underline hover:text-blue-800">{{ cv.pdf.label }}</a>
			<span class="mx-2 text-gray-400">·</span>
			<a :href="links.mode" class="text-blue-600 underline hover:text-blue-800" @click.prevent="$emit('navigate', links.mode)">{{ cv.funny.switchToFunny }}</a>
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
    links: {type: Object, required: true},
});
defineEmits(['navigate']);
</script>
