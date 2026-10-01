<template>
	<section>
		<h2 class="section-title">{{ cv.sections.projects }}</h2>
		<ul class="list-disc pl-5 mt-2 space-y-0.5 text-gray-800">
			<li v-for="project in cv.projects" :key="project.name">
				<b>{{ project.name }}</b>:
				<metric-text :text="project.description" />
			</li>
		</ul>
	</section>
</template>
<script setup>
import MetricText from "@/components/MetricText.vue";

defineProps({
    cv: {type: Object, required: true},
});
</script>
