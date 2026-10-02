<template>
	<section>
		<h2 class="section-title">{{ cv.sections.education }}</h2>
		<div v-for="degree in cv.education" :key="degree.degree" class="mt-2">
			<div class="flex justify-between">
				<h3 class="font-bold text-gray-900">{{ degree.degree }}</h3>
				<span class="text-gray-600">{{ degree.dates }}</span>
			</div>
			<p class="text-gray-800">{{ degree.school }}</p>
		</div>
		<p class="mt-2 font-bold text-gray-900">{{ cv.sections.certifications }}:</p>
		<ul class="list-disc pl-5 text-gray-800">
			<li v-for="certification in cv.certifications" :key="certification">{{ certification }}</li>
		</ul>
		<p class="mt-2 text-gray-800"><b>{{ cv.sections.languages }}:</b> {{ cv.languages }}</p>
	</section>
</template>
<script setup>
defineProps({
    cv: {type: Object, required: true},
});
</script>
