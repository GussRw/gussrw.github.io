<template>
	<section>
		<h2 class="section-title">{{ cv.sections.skills }}</h2>
		<ul class="mt-2 space-y-0.5 text-gray-800">
			<li v-for="skill in cv.skills" :key="skill.category">
				<b>{{ skill.category }}:</b> {{ skill.items }}
			</li>
		</ul>
	</section>
</template>
<script setup>
defineProps({
    cv: {type: Object, required: true},
});
</script>
